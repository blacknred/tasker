import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ClientProxy } from '@nestjs/microservices';
import { EventPublisher } from '@taskapp/eventstore';
import { EventRepository } from '@taskapp/eventstore/event.repository';
import { SEARCH_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { v4 } from 'uuid';
import { IssueAggregate } from '../../aggregations/issue.aggregate';
import { CreateIssueCommand } from '../impl';

@CommandHandler(CreateIssueCommand)
export class CreateIssueHandler implements ICommandHandler<CreateIssueCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly eventRepository: EventRepository,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(CreateIssueHandler.name)
    private readonly logger: PinoLogger,
  ) {}

  async execute({ dto }: CreateIssueCommand) {
    // TODO: db validation 409

    const issue = this.publisher.mergeObjectContext<any>(
      new IssueAggregate({
        ...dto,
        id: v4(),
      }),
    );

    issue.create();
    issue.commit();

    return issue.id;
  }
}
