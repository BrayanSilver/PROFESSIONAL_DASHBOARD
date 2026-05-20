import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });
  app.setGlobalPrefix('api');
  const port = process.env.PORT ?? 3002;
  await app.listen(port);
  console.log(`Dashboard API running on http://localhost:${port}/api`);
}

bootstrap();
