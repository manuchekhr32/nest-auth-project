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
      }),
      validationOptions: {
        abortEarly: true,
      },
    }),
  ],
})
export class AppModule {}
