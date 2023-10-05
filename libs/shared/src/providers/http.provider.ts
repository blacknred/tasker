import { HttpModuleAsyncOptions, HttpModuleOptions } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';

export function getHttpOptions(
  options?: HttpModuleOptions,
): HttpModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      Object.assign(
        {
          timeout: configService.get('HTTP_TIMEOUT'),
          maxRedirects: 3,
        },
        options,
      ),
  };
}
