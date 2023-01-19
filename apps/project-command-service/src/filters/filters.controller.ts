import { Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter, Auth } from '@taskapp/shared';
import { Privilege } from 'src/workspaces/interfaces/workspace.interface';
import { Agent } from 'src/__shared__/decorators/agent.decorator';
import { WithPrivilege } from 'src/__shared__/decorators/with-privilege.decorator';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { AgentGuard } from 'src/__shared__/guards/agent.guard';
import { CreateTaskDto } from './dto/create-task.dto';
import { FiltersResponseDto } from './dto/filters-response.dto';
import { GetTaskDto } from './dto/get-report.dto';
import { GetTasksDto } from './dto/get-reports.dto';
import { TaskResponseDto, TasksResponseDto } from './dto/reports-response.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './reports.service';

@Auth()
@ApiTags('Filters')
@Controller('filters')
@UseFilters(AllExceptionFilter)
export class FiltersController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Post()

  async create(
    @Agent() agent,
    @Payload() createTaskDto: CreateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.create(createTaskDto, agent);
  }

  @Get()
  @ApiOperation({ description: 'List all filters' })
  @ApiOkResponse({ type: FiltersResponseDto })
  getAll(
    @User('id') userId,
    @User('projects') projectIds,
    @Query() dto: GetEntriesDto,
  ): Promise<FiltersResponseDto> {
    return this.queryBus.execute(new GetEntriesQuery(dto, userId, projectIds));
  }

  @MessagePattern('tasks/getOne')
  async getOne(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.findOne(id, agent);
  }

  @MessagePattern('tasks/update')
  async update(
    @Agent() agent,
    @Payload() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskResponseDto> {
    return this.tasksService.update(updateTaskDto, agent);
  }

  @MessagePattern('tasks/delete')
  async remove(
    @Agent() agent,
    @Payload() { id }: GetTaskDto,
  ): Promise<ResponseDto> {
    return this.tasksService.remove(id, agent);
  }
}
