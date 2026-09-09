import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  API_PREFIX,
  OPENAPI_JSON_PATH,
  OPENAPI_PATH,
} from './app.constants.js';
import { ApiExceptionFilter } from './common/filters/api-exception.filter.js';

export function configureApplication(app: INestApplication): void {
  app.setGlobalPrefix(API_PREFIX);
  app.useGlobalFilters(new ApiExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  const openApiConfig = new DocumentBuilder()
    .setTitle('Nexora API')
    .setDescription('Contrato HTTP de la plataforma Nexora')
    .setVersion('1.0')
    .build();
  const openApiDocument = SwaggerModule.createDocument(app, openApiConfig);

  SwaggerModule.setup(OPENAPI_PATH, app, openApiDocument, {
    jsonDocumentUrl: OPENAPI_JSON_PATH,
  });
}
