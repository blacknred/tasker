import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { Connection } from 'amqplib';
import { InjectAmqpConnection } from 'nestjs-amqp';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import { Invoice } from './entities';

@Injectable()
export class InvoicesService {
  constructor(
    private readonly redisService: RedisService,
    @InjectAmqpConnection() private readonly queueService: Connection,
    @InjectRepository(Invoice)
    private invoiceRepository: EntityRepository<Invoice>,
    @InjectPinoLogger(InvoicesService.name)
    private readonly logger: PinoLogger,
  ) {}
}
