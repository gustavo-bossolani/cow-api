import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import { StatementModule } from './statement/statement.module';
import { OverviewModule } from './overview/overview.module';
import { CategoryModule } from 'src/category/category.module';
import { AuthModule } from './auth/auth.module';

import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Cow api')
    .setDescription('The system to control your money')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, CategoryModule, OverviewModule, StatementModule],
  });
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3000);
  logger.log(`Application listening on ${3000}`);
}
bootstrap();
