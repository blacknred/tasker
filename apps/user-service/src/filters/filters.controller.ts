import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter, Auth, Session } from '@taskapp/shared';
import {
  FilterResponseDto,
  FiltersResponseDto,
  GetFilterDto,
  GetFiltersDto,
} from './dto';
import { GetFilterQuery, GetFiltersQuery } from './queries';

@Auth()
@ApiTags('Filters')
@Controller('filters')
@UseFilters(AllExceptionFilter)
export class FiltersController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all filters' })
  @ApiOkResponse({ type: FiltersResponseDto })
  async getAll(
    @Session('userId') userId,
    @Query() dto: GetFiltersDto,
  ): Promise<FiltersResponseDto> {
    return this.queryBus.execute(new GetFiltersQuery(dto, userId));
  }

  @Get(':id')
  @ApiOperation({ description: 'Get filter by id' })
  @ApiOkResponse({ type: FilterResponseDto })
  async getOne(
    @Session('userId') userId,
    @Param() { id }: GetFilterDto,
  ): Promise<FilterResponseDto> {
    return this.queryBus.execute(new GetFilterQuery(id, userId));
  }
}


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

  @Get()
  @ApiOperation({ description: 'List all search results' })
  @ApiOkResponse({ type: EntriesResponseDto })
  getAll(
    @Session('userId') userId,
    @Session('projectIds') projectIds,
    @Query() dto: GetEntriesDto,
  ): Promise<EntriesResponseDto> {
    return this.queryBus.execute(new GetEntriesQuery(dto, userId, projectIds));
  }

  @Get()
  @ApiOperation({ description: 'List all search results' })
  @ApiOkResponse({ type: EntriesResponseDto })
  getAll(
    @Session('userId') userId,
    @Session('projectIds') projectIds,
    @Query() dto: GetEntriesDto,
  ): Promise<EntriesResponseDto> {
    return this.queryBus.execute(new GetEntriesQuery(dto, userId, projectIds));
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




@Auth()
@ApiTags('Filters')
@Controller('filters')
@UseFilters(AllExceptionFilter)
export class FiltersController {
  constructor(private readonly filterService: CommandBus) {}

  @Post()
  @ApiOperation({ description: 'Create filter' })
  @ApiCreatedResponse({ type: FilterResponseDto })
  async create(
    @Session('userId') userId,
    @Body() dto: CreateFilterDto,
  ): Promise<CreateFilterCommand> {
    const { id: data } = await this.commandBus.execute(
      new CreateFilterCommand(dto, userId),
    );
    return { data };
  }

  @Get()
  @ApiOperation({ description: 'List all search results' })
  @ApiOkResponse({ type: EntriesResponseDto })
  getAll(
    @Session('userId') userId,
    @Session('projectIds') projectIds,
    @Query() dto: GetEntriesDto,
  ): Promise<EntriesResponseDto> {
    return this.queryBus.execute(new GetEntriesQuery(dto, userId, projectIds));
  }

  @Get()
  @ApiOperation({ description: 'List all search results' })
  @ApiOkResponse({ type: EntriesResponseDto })
  getAll(
    @Session('userId') userId,
    @Session('projectIds') projectIds,
    @Query() dto: GetEntriesDto,
  ): Promise<EntriesResponseDto> {
    return this.queryBus.execute(new GetEntriesQuery(dto, userId, projectIds));
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
