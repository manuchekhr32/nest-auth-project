import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsConfig } from './global/config/cors.config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerConfig } from './global/config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  new CorsConfig(app).enable(process.env.CORS);
  new SwaggerConfig(app).enable(process.env.SWAGGER_ENABLED === 'true');
  await app.listen(+process.env.PORT);
}
bootstrap();
