import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api/v1');
  //app.useGlobalPipes(new ValidationPipe({ transform: true, validateCustomDecorators: true }));
  app.useGlobalPipes(new ValidationPipe({ transform: true, validateCustomDecorators: true, whitelist : true }));
  
  const config = new DocumentBuilder()
                    .setTitle('Vote API')
                    .setDescription('API for online voting system')
                    .setVersion('1.0')
                    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
