import { Module } from "@nestjs/common";
import { LoggerModule } from 'nestjs-pino';
import { stdTimeFunctions } from 'pino';
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        pinoHttp: {
          timestamp: stdTimeFunctions.isoTime,
          level: config.get("NODE_ENV") !== 'production' ? 'trace' : 'info',
          prettyPrint: config.get("NODE_ENV") !== 'production',
          useLevelLabels: true,
        },
      }),
    })
  ]
})
export class LoggingModule {}

// const module: TestingModule = await Test.createTestingModule({
//   providers: [
//     MyService,
//     {
//       provide: getLoggerToken(MyService.name),
//       useValue: mockLogger,
//     },
//   ],
// }).compile();