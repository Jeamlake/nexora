import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { environmentValidationSchema } from './config/environment.validation.js';
import { DatabaseModule } from './database/database.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { ProfileModule } from './modules/profile/profile.module.js';

const apiRoot = join(dirname(fileURLToPath(import.meta.url)), '..');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [join(apiRoot, '.env.local'), join(apiRoot, '.env')],
      isGlobal: true,
      validationSchema: environmentValidationSchema,
    }),
    DatabaseModule,
    HealthModule,
    AuthModule,
    ProfileModule,
  ],
})
export class AppModule {}
