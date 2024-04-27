import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsString()
  @ApiProperty({
    example: 'john',
  })
  username: string;

  @IsString()
  @ApiProperty({
    example: 'undefined',
  })
  password: string;
}
