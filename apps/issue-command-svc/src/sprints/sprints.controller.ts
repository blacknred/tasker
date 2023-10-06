import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Auth,
  Authentication,
  GetProjectDto,
  IdResponseDto,
  Permission,
  Policy,
} from '@taskapp/shared';
import {
  CreateSprintCommand,
  DeleteSprintCommand,
  UpdateSprintCommand,
} from './commands';
import { CreateSprintDto, DeleteSprintDto, UpdateSprintDto } from './dto';

@Authentication()
@ApiTags('Sprints')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class SprintsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':pid/sprints')
  @ApiOperation({ description: 'Сreate sprint' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async create(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Body() dto: CreateSprintDto,
  ): Promise<IdResponseDto> {
    const { id } = await this.commandBus.execute(
      new CreateSprintCommand(pid, dto, userId),
    );
    return { data: id };
  }

  @Patch(':pid/sprints:id')
  @ApiOperation({ description: 'Update sprint' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(Policy.SPRINT_MANAGEMENT)
  async update(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteSprintDto,
    @Body() dto: UpdateSprintDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(
      new UpdateSprintCommand(pid, id, dto, userId),
    );
    return { data: id };
  }

  @Delete(':pid/sprints:id')
  @ApiOperation({ description: 'Delete sprint' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(Policy.SPRINT_MANAGEMENT)
  async delete(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteSprintDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteSprintCommand(pid, id, userId));
    return { data: id };
  }
}
