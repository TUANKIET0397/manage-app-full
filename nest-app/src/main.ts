import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: [''] });
  // app.enableCors({
  //   origin: '*', // Cho phép tất cả các nguồn truy cập
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Cho phép các phương thức HTTP
  //   allowedHeaders: 'Content-Type, Accept', // Cho phép các header cụ thể
  // });
    

  await app.listen(process.env.PORT ?? 8086);
}
bootstrap();
