import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
    }),
  );
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  // app.enableCors({
  //   origin: '*', // Cho phép tất cả các nguồn truy cập
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Cho phép các phương thức HTTP
  //   allowedHeaders: 'Content-Type, Accept', // Cho phép các header cụ thể
  // });

  //config cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 8086);
}
bootstrap();
