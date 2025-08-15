import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { OfferingCategoryService } from './offering-category.service';
import { CreateOfferingCategoryDto } from './dto/create-offering-category.dto';
import { UpdateOfferingCategoryDto } from './dto/update-offering-category.dto';
import { OfferingCategoryResponseDto } from './dto/offering-category-response.dto';

@ApiTags('offering-categories')
@Controller('offering-categories')
export class OfferingCategoryController {
    constructor(private readonly offeringCategoryService: OfferingCategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new offering category' })
    @ApiBody({ type: CreateOfferingCategoryDto })
    @ApiResponse({ status: 201, description: 'Offering category created', type: OfferingCategoryResponseDto })
    async create(@Body() data: CreateOfferingCategoryDto): Promise<OfferingCategoryResponseDto> {
        return this.offeringCategoryService.create(data);
    }

    @Get()
    @ApiOperation({ summary: 'List all offering categories' })
    @ApiResponse({ status: 200, description: 'List of offering categories', type: [OfferingCategoryResponseDto] })
    async findAll(): Promise<OfferingCategoryResponseDto[]> {
        return this.offeringCategoryService.findAll();
    }

    @Get(':uuid')
    @ApiOperation({ summary: 'Get an offering category by UUID' })
    @ApiParam({ name: 'uuid', description: 'Offering category UUID' })
    @ApiResponse({ status: 200, description: 'Offering category found', type: OfferingCategoryResponseDto })
    @ApiResponse({ status: 404, description: 'Offering category not found' })
    async findOne(@Param('uuid') uuid: string): Promise<OfferingCategoryResponseDto> {
        return this.offeringCategoryService.findOne(uuid);
    }

    @Patch(':uuid')
    @ApiOperation({ summary: 'Update an offering category' })
    @ApiParam({ name: 'uuid', description: 'Offering category UUID' })
    @ApiBody({ type: UpdateOfferingCategoryDto })
    @ApiResponse({ status: 200, description: 'Offering category updated', type: OfferingCategoryResponseDto })
    @ApiResponse({ status: 404, description: 'Offering category not found' })
    async update(
        @Param('uuid') uuid: string,
        @Body() data: UpdateOfferingCategoryDto,
    ): Promise<OfferingCategoryResponseDto> {
        return this.offeringCategoryService.update(uuid, data);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete an offering category' })
    @ApiParam({ name: 'uuid', description: 'Offering category UUID' })
    @ApiResponse({ status: 204, description: 'Offering category deleted' })
    @ApiResponse({ status: 404, description: 'Offering category not found' })
    async delete(@Param('uuid') uuid: string): Promise<void> {
        return this.offeringCategoryService.delete(uuid);
    }
} 