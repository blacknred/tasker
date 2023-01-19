import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { UserService } from '../../../service/user.service';
import { CreateFilterCommand } from '../impl/create-filter.command';
import { CreateUserCommand } from '../impl/create-user.command';

@CommandHandler(CreateFilterCommand)
export class CreateFilterHandler implements ICommandHandler<CreateUserCommand> {
  constructor(
    private readonly userService: UserService,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateUserCommand) {
    console.log(`Async ${this.constructor.name}...`, command.constructor.name);
    const { input } = command;
    const user = this.publisher.mergeObjectContext(
      await this.userService.create(input),
    );
    user.createSearchEntry();
    user.commit();
    return user;
  }
}

const command: OpenAccountCommand = new OpenAccountCommand(payload);

await this.commandBus.execute(command);

return { status: HttpStatus.OK, data: command.getId(), error: null };