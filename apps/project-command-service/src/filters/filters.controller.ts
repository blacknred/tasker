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
  EmptyResponseDto,
  IdResponseDto,
  Session,
} from '@taskapp/shared';
import {
  CreateFilterCommand,
  DeleteFilterCommand,
  UpdateFilterCommand,
} from './commands';
import { CreateFilterDto, DeleteFilterDto, UpdateFilterDto } from './dto';

@Auth()
@ApiTags('Filters')
@Controller('filters')
@UseFilters(AllExceptionFilter)
export class FiltersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ description: 'Create filter' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async create(
    @Session('userId') userId,
    @Body() dto: CreateFilterDto,
  ): Promise<IdResponseDto> {
    const { id: data } = await this.commandBus.execute(
      new CreateFilterCommand(dto, userId),
    );
    return { data };
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update filter' })
  @ApiOkResponse({ type: IdResponseDto })
  async update(
    @Session('userId') userId,
    @Param() { id }: DeleteFilterDto,
    @Body() dto: UpdateFilterDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new UpdateFilterCommand(id, dto, userId));
    return { data: id };
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete filter' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Session('userId') userId,
    @Param() { id }: DeleteFilterDto,
  ): Promise<EmptyResponseDto> {
    await this.commandBus.execute(new DeleteFilterCommand(id, userId));
    return { data: null };
  }
}
