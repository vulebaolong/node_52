import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './common/constant/app.constant';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // bật Chức năng chuyển kiểu dữ liệu
      transform: true,
      // tự suy ra kiểu dữ liệu của biến 
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.setGlobalPrefix('api');

  await app.listen(PORT ?? 3000, () => {
    console.log(`🤷 Server online at http://localhost:${PORT}`);
  });
}
bootstrap();

/**

cài prisma bị lỗi (prisma update version mới 7.0.0)
- nên cài prisma phiên bản 6.19.0
- npm i prisma@6.19.0 --save-dev
- npm i @prisma/client@6.190
  - 2 thư viện prisma và @prisma/client phải cùng version

kiểm tra 2 file
file: prisma/schema.prisma
  - thêm moduleFormat = "cjs"
generator client {
  provider     = "prisma-client"
  output       = "../src/modules-system/prisma/generated/prisma"
  moduleFormat = "cjs"
}

file: prisma.config.ts
thêm dòng import 'dotenv/config';
  - trước khi thêm dòng import dotenv
  - tích hợp config env vào nest
    - npm i @nestjs/config
    - thêm dòng imports: [ConfigModule.forRoot()]



 */
