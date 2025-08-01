// import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
// import { ServiceService } from './service.service';

// @Controller('services')
// export class ServiceController {
//   constructor(private readonly serviceService: ServiceService) {}

//   @Post()
//   async create(@Body() data: any) {
//     return this.serviceService.create(data);
//   }

//   @Get()
//   async findAll() {
//     return this.serviceService.findAll();
//   }

//   @Get(':id')
//   async findOne(@Param('id') id: string) {
//     return this.serviceService.findOne(id);
//   }

//   @Patch(':id')
//   async update(@Param('id') id: string, @Body() data: any) {
//     return this.serviceService.update(id, data);
//   }

//   @Delete(':id')
//   async delete(@Param('id') id: string) {
//     return this.serviceService.delete(id);
//   }
// }
