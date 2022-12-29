import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MembersController } from './members.controller';
import { MembersService } from './members.service';

@Global()
@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Member])],
  controllers: [MembersController],
  providers: [MembersService],
})
export class MembersModule {}
