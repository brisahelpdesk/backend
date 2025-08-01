import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@ApiTags('employees')
@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  // Basic CRUD endpoints
  @Get()
  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of all employees', type: [EmployeeResponseDto] })
  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findAll();
  }

  @Get(':uuid')
  @ApiOperation({ summary: 'Get employee by UUID' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiResponse({ status: 200, description: 'Employee found', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findOne(@Param('uuid') uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeService.findOne(uuid);
  }

  @Post()
  @ApiOperation({ summary: 'Create new employee' })
  @ApiResponse({ status: 201, description: 'Employee created', type: EmployeeResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async create(@Body() data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeeService.create(data);
  }

  @Put(':uuid')
  @ApiOperation({ summary: 'Update employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiResponse({ status: 200, description: 'Employee updated', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async update(
    @Param('uuid') uuid: string,
    @Body() data: UpdateEmployeeDto,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.update(uuid, data);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiResponse({ status: 204, description: 'Employee deleted successfully' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async delete(@Param('uuid') uuid: string): Promise<void> {
    return this.employeeService.delete(uuid);
  }

  // Search endpoints
  @Get('search/email')
  @ApiOperation({ summary: 'Find employee by email' })
  @ApiQuery({ name: 'email', description: 'Employee email address' })
  @ApiResponse({ status: 200, description: 'Employee found', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findByEmail(@Query('email') email: string): Promise<EmployeeResponseDto | null> {
    return this.employeeService.findByEmail(email);
  }

  @Get('search/tax-id')
  @ApiOperation({ summary: 'Find employee by tax ID' })
  @ApiQuery({ name: 'taxId', description: 'Employee tax ID (CPF)' })
  @ApiResponse({ status: 200, description: 'Employee found', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async findByTaxId(@Query('taxId') taxId: string): Promise<EmployeeResponseDto | null> {
    return this.employeeService.findByTaxId(taxId);
  }

  // Status management endpoints
  @Put(':uuid/activate')
  @ApiOperation({ summary: 'Activate employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiResponse({ status: 200, description: 'Employee activated', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async activateEmployee(@Param('uuid') uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeService.activateEmployee(uuid);
  }

  @Put(':uuid/deactivate')
  @ApiOperation({ summary: 'Deactivate employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiResponse({ status: 200, description: 'Employee deactivated', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async deactivateEmployee(@Param('uuid') uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeService.deactivateEmployee(uuid);
  }

  // Department management endpoints
  @Get('department/:departmentId')
  @ApiOperation({ summary: 'Get employees by department ID' })
  @ApiParam({ name: 'departmentId', description: 'Department ID' })
  @ApiResponse({ status: 200, description: 'List of employees in department', type: [EmployeeResponseDto] })
  async findEmployeesByDepartment(@Param('departmentId') departmentId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByDepartment(departmentId);
  }

  @Get('department/uuid/:departmentUuid')
  @ApiOperation({ summary: 'Get employees by department UUID' })
  @ApiParam({ name: 'departmentUuid', description: 'Department UUID' })
  @ApiResponse({ status: 200, description: 'List of employees in department', type: [EmployeeResponseDto] })
  async findEmployeesByDepartmentUuid(@Param('departmentUuid') departmentUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByDepartmentUuid(departmentUuid);
  }

  // Branch management endpoints
  @Get('branch/:branchId')
  @ApiOperation({ summary: 'Get employees by branch ID' })
  @ApiParam({ name: 'branchId', description: 'Branch ID' })
  @ApiResponse({ status: 200, description: 'List of employees in branch', type: [EmployeeResponseDto] })
  async findEmployeesByBranch(@Param('branchId') branchId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByBranch(branchId);
  }

  @Get('branch/uuid/:branchUuid')
  @ApiOperation({ summary: 'Get employees by branch UUID' })
  @ApiParam({ name: 'branchUuid', description: 'Branch UUID' })
  @ApiResponse({ status: 200, description: 'List of employees in branch', type: [EmployeeResponseDto] })
  async findEmployeesByBranchUuid(@Param('branchUuid') branchUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByBranchUuid(branchUuid);
  }

  // Job position management endpoints
  @Get('job-position/:jobPositionId')
  @ApiOperation({ summary: 'Get employees by job position ID' })
  @ApiParam({ name: 'jobPositionId', description: 'Job position ID' })
  @ApiResponse({ status: 200, description: 'List of employees in job position', type: [EmployeeResponseDto] })
  async findEmployeesByJobPosition(@Param('jobPositionId') jobPositionId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByJobPosition(jobPositionId);
  }

  @Get('job-position/uuid/:jobPositionUuid')
  @ApiOperation({ summary: 'Get employees by job position UUID' })
  @ApiParam({ name: 'jobPositionUuid', description: 'Job position UUID' })
  @ApiResponse({ status: 200, description: 'List of employees in job position', type: [EmployeeResponseDto] })
  async findEmployeesByJobPositionUuid(@Param('jobPositionUuid') jobPositionUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByJobPositionUuid(jobPositionUuid);
  }

  // Supervisor management endpoints
  @Get('supervisor/:supervisorId')
  @ApiOperation({ summary: 'Get employees by supervisor ID' })
  @ApiParam({ name: 'supervisorId', description: 'Supervisor employee ID' })
  @ApiResponse({ status: 200, description: 'List of employees supervised', type: [EmployeeResponseDto] })
  async findEmployeesBySupervisor(@Param('supervisorId') supervisorId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesBySupervisor(supervisorId);
  }

  @Get('supervisor/uuid/:supervisorUuid')
  @ApiOperation({ summary: 'Get employees by supervisor UUID' })
  @ApiParam({ name: 'supervisorUuid', description: 'Supervisor employee UUID' })
  @ApiResponse({ status: 200, description: 'List of employees supervised', type: [EmployeeResponseDto] })
  async findEmployeesBySupervisorUuid(@Param('supervisorUuid') supervisorUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesBySupervisorUuid(supervisorUuid);
  }

  // Status filtering endpoints
  @Get('status/active')
  @ApiOperation({ summary: 'Get all active employees' })
  @ApiResponse({ status: 200, description: 'List of active employees', type: [EmployeeResponseDto] })
  async findActiveEmployees(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findActiveEmployees();
  }

  @Get('status/inactive')
  @ApiOperation({ summary: 'Get all inactive employees' })
  @ApiResponse({ status: 200, description: 'List of inactive employees', type: [EmployeeResponseDto] })
  async findInactiveEmployees(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findInactiveEmployees();
  }

  // Employment period management endpoints
  @Get('hired/range')
  @ApiOperation({ summary: 'Get employees by hire date range' })
  @ApiQuery({ name: 'startDate', description: 'Start date (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', description: 'End date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'List of employees hired in range', type: [EmployeeResponseDto] })
  async findEmployeesByHireDateRange(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesByHireDateRange(startDate, endDate);
  }

  @Put(':uuid/dismiss')
  @ApiOperation({ summary: 'Dismiss employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiQuery({ name: 'dismissalDate', description: 'Dismissal date (YYYY-MM-DD)' })
  @ApiResponse({ status: 200, description: 'Employee dismissed', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async dismissEmployee(
    @Param('uuid') uuid: string,
    @Query('dismissalDate') dismissalDate: string,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.dismissEmployee(uuid, dismissalDate);
  }

  // User account management endpoints
  @Get('user-account/with')
  @ApiOperation({ summary: 'Get employees with user accounts' })
  @ApiResponse({ status: 200, description: 'List of employees with user accounts', type: [EmployeeResponseDto] })
  async findEmployeesWithUserAccount(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesWithUserAccount();
  }

  @Get('user-account/without')
  @ApiOperation({ summary: 'Get employees without user accounts' })
  @ApiResponse({ status: 200, description: 'List of employees without user accounts', type: [EmployeeResponseDto] })
  async findEmployeesWithoutUserAccount(): Promise<EmployeeResponseDto[]> {
    return this.employeeService.findEmployeesWithoutUserAccount();
  }

  @Put(':uuid/associate-user')
  @ApiOperation({ summary: 'Associate user account with employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiQuery({ name: 'userId', description: 'User ID to associate' })
  @ApiResponse({ status: 200, description: 'User account associated', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async associateUserAccount(
    @Param('uuid') uuid: string,
    @Query('userId') userId: number,
  ): Promise<EmployeeResponseDto> {
    return this.employeeService.associateUserAccount(uuid, userId);
  }

  @Put(':uuid/disassociate-user')
  @ApiOperation({ summary: 'Disassociate user account from employee' })
  @ApiParam({ name: 'uuid', description: 'Employee UUID' })
  @ApiResponse({ status: 200, description: 'User account disassociated', type: EmployeeResponseDto })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async disassociateUserAccount(@Param('uuid') uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeService.disassociateUserAccount(uuid);
  }
} 