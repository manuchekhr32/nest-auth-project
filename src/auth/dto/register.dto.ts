import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @MaxLength(20)
  @ApiProperty({
    example: 'john',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'undefined',
  })
  password: string;

  @IsString()
  @MaxLength(80)
  @ApiProperty({
    example: 'John Doe',
  })
  fullName: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @ApiProperty({
    required: false,
  })
  about?: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  @ApiProperty({
    required: false,
  })
  website?: string;
}
