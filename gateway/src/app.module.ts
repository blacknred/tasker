import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'HELLO_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get('HELLO_SERVICE_HOST'),
            port: configService.get('HELLO_SERVICE_PORT'),
          },
        }),
    },
  ],
})
export class AppModule {}
