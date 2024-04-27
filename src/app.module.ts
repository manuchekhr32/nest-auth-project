import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(9000),
        CORS: Joi.string().default('*'),
        SWAGGER_ENABLED: Joi.boolean().default(false),
        JWT_ACCESS_SECRET: Joi.string(),
        JWT_REFRESH_SECRET: Joi.string(),
        // DB
        DB_USER: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        DB_PORT: Joi.number(),
        DB_HOST: Joi.string(),
        DB_URL: Joi.string(),
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
    AuthModule,
  ],
})
export class AppModule {}
