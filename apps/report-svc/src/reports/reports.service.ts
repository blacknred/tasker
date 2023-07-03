import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Issue } from './entities';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Issue)
    private issueRepository: EntityRepository<Issue>,
    @InjectPinoLogger(ReportsService.name)
    private readonly logger: PinoLogger,
  ) {}
}
