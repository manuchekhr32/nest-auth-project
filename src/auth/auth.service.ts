import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { IJwtPayload } from '../types/jwt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private refreshTokenOptions = {
    secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    expiresIn: '29d',
  };

  async generateTokens(payload: IJwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenOptions),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }

  async register(payload: RegisterDto) {
    const userWithUname = await this.prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });
    if (userWithUname)
      throw new BadRequestException('Username should be unique');
    payload.password = await bcrypt.hash(payload.password, 12);
    payload.username = payload.username.toLowerCase();
    const user = await this.prisma.user.create({
      data: payload,
    });
    return this.generateTokens({
      userId: user.id,
    });
  }

  async login(payload: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: payload.username },
    });
    if (!user) throw new NotFoundException('User not found');
    if (!(await bcrypt.compare(payload.password, user.password)))
      throw new UnauthorizedException('Password is invalid');
    return this.generateTokens({ userId: user.id });
  }

  async refreshToken(payload: RefreshTokenDto) {
    const jwtPayload = await this.jwtService.verifyAsync<IJwtPayload>(
      payload.token,
      this.refreshTokenOptions,
    );
    const user = await this.prisma.user.findUnique({
      where: { id: jwtPayload.userId },
    });
    if (!user) throw new UnauthorizedException('User not found');
    const accessToken = await this.jwtService.signAsync({
      userId: user.id,
    });
    return { accessToken };
  }

  async validateUser(payload: IJwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        username: true,
        about: true,
        fullName: true,
        website: true,
        updatedAt: true,
        createdAt: true,
      },
    });
    if (!user) throw new UnauthorizedException('User not found');
    return user;
  }
}
