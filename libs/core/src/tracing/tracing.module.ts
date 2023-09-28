import { Module } from '@nestjs/common';
import { TracingModule as Tracing } from '@dollarsign/nestjs-jaeger-tracing';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    Tracing.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        isSimpleSpanProcessor: true,
        exporterConfig: {
          serviceName: config.get('SERVICE_NAME'),
        },
      }),
    }),
  ],
})
export class TracingModule {}
