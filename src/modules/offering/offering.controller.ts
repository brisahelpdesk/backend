import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Put,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiQuery } from '@nestjs/swagger';
import { OfferingService } from './offering.service';
import { CreateOfferingDto } from './dto/create-offering.dto';
import { UpdateOfferingDto } from './dto/update-offering.dto';
import { OfferingResponseDto } from './dto/offering-response.dto';
import { ListOfferingsQueryDto } from './dto/list-offerings.query.dto';

@ApiTags('offerings')
@Controller('offerings')
export class OfferingController {
    constructor(private readonly offeringService: OfferingService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new offering' })
    @ApiBody({ type: CreateOfferingDto })
    @ApiResponse({ status: 201, description: 'Offering created', type: OfferingResponseDto })
    async create(@Body() data: CreateOfferingDto): Promise<OfferingResponseDto> {
        return this.offeringService.create(data);
    }

    @Get()
    @ApiOperation({ summary: 'List all offerings' })
    @ApiResponse({ status: 200, description: 'List of offerings', type: [OfferingResponseDto] })
    async findAll(@Query() query: ListOfferingsQueryDto): Promise<OfferingResponseDto[]> {
        return this.offeringService.findAll(query);
    }

    @Get(':uuid')
    @ApiOperation({ summary: 'Get an offering by UUID' })
    @ApiParam({ name: 'uuid', description: 'Offering UUID' })
    @ApiResponse({ status: 200, description: 'Offering found', type: OfferingResponseDto })
    @ApiResponse({ status: 404, description: 'Offering not found' })
    async findOne(@Param('uuid') uuid: string): Promise<OfferingResponseDto> {
        return this.offeringService.findOne(uuid);
    }

    @Patch(':uuid')
    @ApiOperation({ summary: 'Update an offering' })
    @ApiParam({ name: 'uuid', description: 'Offering UUID' })
    @ApiBody({ type: UpdateOfferingDto })
    @ApiResponse({ status: 200, description: 'Offering updated', type: OfferingResponseDto })
    @ApiResponse({ status: 404, description: 'Offering not found' })
    async update(
        @Param('uuid') uuid: string,
        @Body() data: UpdateOfferingDto,
    ): Promise<OfferingResponseDto> {
        return this.offeringService.update(uuid, data);
    }

    // TODO: implement PUT methods on service and repository layers
    // @Put(':uuid')
    // @ApiOperation({ summary: 'Replace an offering (PUT)' })
    // @ApiParam({ name: 'uuid', description: 'Offering UUID' })
    // @ApiBody({ type: UpdateOfferingDto })
    // @ApiResponse({ status: 200, description: 'Offering replaced', type: OfferingResponseDto })
    // @ApiResponse({ status: 404, description: 'Offering not found' })
    // async replace(
    //     @Param('uuid') uuid: string,
    //     @Body() data: UpdateOfferingDto,
    // ): Promise<OfferingResponseDto> {
    //     return this.offeringService.update(uuid, data);
    // }

    @Delete(':uuid')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete an offering' })
    @ApiParam({ name: 'uuid', description: 'Offering UUID' })
    @ApiResponse({ status: 204, description: 'Offering deleted' })
    @ApiResponse({ status: 404, description: 'Offering not found' })
    async delete(@Param('uuid') uuid: string): Promise<void> {
        return this.offeringService.delete(uuid);
    }
}
