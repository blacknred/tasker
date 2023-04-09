import { HttpModuleAsyncOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

export function getHttpOptions(
  options?: HttpModuleAsyncOptions,
): HttpModuleAsyncOptions {
  return Object.assign(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        timeout: configService.get('HTTP_TIMEOUT'),
        maxRedirects: 3,
      }),
    },
    options,
  );
}
