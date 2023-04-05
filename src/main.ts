import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import figlet = require('figlet');
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import express = require('express');
import path = require('path');
import * as morgan from 'morgan';
import * as cors from 'cors';
import { ExceptionsFilter } from './shared/filters/http-exceptions.filter';
import { QueryExceptionFilter } from './shared/filters/query-exception.filter';
import { TransformResponseInterceptor } from './shared/interceptors/transform-response.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });


  
  app.setGlobalPrefix(process.env.API_PREFIX);
  /**
 * Security and optimization middlewares
 */
  app.use(cors());

  /**
* Transform successful responses interceptor
*/
  app.useGlobalInterceptors(new TransformResponseInterceptor());

  /**
  * Transform failure responses filter
  */
  app.useGlobalFilters(new QueryExceptionFilter());
  app.useGlobalFilters(new ExceptionsFilter());

  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('BARSHA FOOD API')
      .setDescription('The BARSHA FOOD API description')
      .setVersion('2.0')
      .addTag('barshafood')
      //.addServer(process.env.SWAGER_SERVER)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      ignoreGlobalPrefix: false,
      deepScanRoutes: true,
    });
    SwaggerModule.setup('api-docs', app, document);
    /** Morgan Config */
    app.use(morgan('dev'));

  }
  app.useGlobalPipes(new ValidationPipe());

  /** Serve static files */
  app.use(
    '/public/uploads/',
    express.static(path.join(process.cwd(), 'uploads')),
  );
  await app.listen(3004);
  figlet('BARSHA FOOD API', function (err, data) {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });
  
}
bootstrap();