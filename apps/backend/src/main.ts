import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import './config/preload-env';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { AppEnvironment } from './config/environment';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  const configService = app.get<ConfigService<AppEnvironment>>(ConfigService);

  app.enableShutdownHooks();
  app.useGlobalFilters(new GlobalExceptionFilter());

  if (configService.get<boolean>('JWT_SECRET_GENERATED')) {
    logger.warn(
      'JWT_SECRET is not set. A temporary development secret was generated for this process. Configure JWT_SECRET before production deployment.',
    );
  }

  // Security & Validation
  const allowedOrigins = [
    configService.get<string>('FRONTEND_ORIGIN'),
    configService.get<string>('ADMIN_ORIGIN'),
    'http://localhost:3001',
    'http://localhost:3003',
  ].filter(Boolean);
  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('api/v1');

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('BoardPeFocus API')
    .setDescription(
      'The core API for BoardPeFocus platform powering public and admin apps.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  const port = configService.get<number>('PORT') ?? 3001;
  await app.listen(port, '0.0.0.0');

  logger.log(`Application is running on: http://localhost:${port}/api/v1`);
  logger.log(`Documentation available at: http://localhost:${port}/api/v1/docs`);
}

void bootstrap().catch((error: unknown) => {
  const logger = new Logger('Bootstrap');
  const trace = error instanceof Error ? error.stack : String(error);
  logger.error('Failed to start application', trace);
  process.exit(1);
});
