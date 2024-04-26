import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().port().default(9000),
        CORS: Joi.string().default('*'),
        SWAGGER_ENABLED: Joi.boolean().default(false),
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
  ],
})
export class AppModule {}
