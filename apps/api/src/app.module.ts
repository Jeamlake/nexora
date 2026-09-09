import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environmentValidationSchema } from './config/environment.validation.js';
import { HealthModule } from './modules/health/health.module.js';

const apiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [join(apiRoot, '.env.local'), join(apiRoot, '.env')],
      isGlobal: true,
      validationSchema: environmentValidationSchema,
    }),
    HealthModule,
  ],
})
export class AppModule {}
