import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
} from '@nestjs/common';
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
  EmptyResponseDto,
} from '@taskapp/shared';
import {
  CreateFilterDto,
  DeleteFilterDto,
  FilterResponseDto,
  FiltersResponseDto,
  GetFilterDto,
  GetFiltersDto,
  UpdateFilterDto,
} from './dto';
import { FiltersService } from './filters.service';

@Authentication()
@ApiTags('Filters')
@Controller('filters')
@UseFilters(AllExceptionFilter)
export class FiltersController {
  constructor(private readonly filtersService: FiltersService) {}

  @Post()
  @ApiOperation({ description: 'Create filter' })
  @ApiCreatedResponse({ type: FilterResponseDto })
  async create(
    @Auth('userId') userId,
    @Body() dto: CreateFilterDto,
  ): Promise<FilterResponseDto> {
    return this.filtersService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ description: 'List all filters' })
  @ApiOkResponse({ type: FiltersResponseDto })
  async getAll(
    @Auth('userId') userId,
    @Query() dto: GetFiltersDto,
  ): Promise<FiltersResponseDto> {
    return this.filtersService.findAll(dto, userId);
  }

  @Get(':id')
  @ApiOperation({ description: 'Get filter by id' })
  @ApiOkResponse({ type: FilterResponseDto })
  async getOne(
    @Auth('userId') userId,
    @Param() { id }: GetFilterDto,
  ): Promise<FilterResponseDto> {
    return this.filtersService.findOne(id, userId);
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update filter' })
  @ApiOkResponse({ type: FilterResponseDto })
  async update(
    @Auth('userId') userId,
    @Param() { id }: GetFilterDto,
    @Body() dto: UpdateFilterDto,
  ): Promise<FilterResponseDto> {
    return this.filtersService.update(id, dto, userId);
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete filter' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(
    @Auth('userId') userId,
    @Param() { id }: DeleteFilterDto,
  ): Promise<EmptyResponseDto> {
    return this.filtersService.remove(id, userId);
  }
}
