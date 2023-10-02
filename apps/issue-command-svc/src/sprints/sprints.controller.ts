import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
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
  IdResponseDto,
  Permission,
  WorkspacePolicy,
} from '@taskapp/shared';
import {
  CreateSprintCommand,
  DeleteSprintCommand,
  UpdateSprintCommand,
} from './commands';
import { CreateSprintDto, DeleteSprintDto, UpdateSprintDto } from './dto';

// @Auth()
@ApiTags('Sprints')
@Controller('sprints')
@UseFilters(AllExceptionFilter)
export class SprintsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ description: 'Сreate sprint' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async create(
    @Auth('userId') userId,
    @Body() dto: CreateSprintDto,
  ): Promise<IdResponseDto> {
    const { id } = await this.commandBus.execute(
      new CreateSprintCommand(dto, userId),
    );
    return { data: id };
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update sprint' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.SPRINT_MANAGEMENT)
  async update(
    @Auth('userId') userId,
    @Param() { id }: DeleteSprintDto,
    @Body() dto: UpdateSprintDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new UpdateSprintCommand(id, dto, userId));
    return { data: id };
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete sprint' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.SPRINT_MANAGEMENT)
  async delete(
    @Auth('userId') userId,
    @Param() { id }: DeleteSprintDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteSprintCommand(id, userId));
    return { data: id };
  }
}
