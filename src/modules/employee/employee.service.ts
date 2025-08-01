import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';

@Injectable()
export class EmployeeService {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  // Basic CRUD Operations
  async create(data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeeRepository.create(data);
  }

  async findAll(): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findAll();
  }

  async findOne(uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeRepository.findOne(uuid);
  }

  async findByEmail(email: string): Promise<EmployeeResponseDto | null> {
    return this.employeeRepository.findByEmail(email);
  }

  async findByTaxId(taxId: string): Promise<EmployeeResponseDto | null> {
    return this.employeeRepository.findByTaxId(taxId);
  }

  async update(uuid: string, data: UpdateEmployeeDto): Promise<EmployeeResponseDto> {
    return this.employeeRepository.update(uuid, data);
  }

  async delete(uuid: string): Promise<void> {
    return this.employeeRepository.delete(uuid);
  }

  // Status Management
  async activateEmployee(uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeRepository.activateEmployee(uuid);
  }

  async deactivateEmployee(uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeRepository.deactivateEmployee(uuid);
  }

  // Department Management
  async findEmployeesByDepartment(departmentId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByDepartment(departmentId);
  }

  async findEmployeesByDepartmentUuid(departmentUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByDepartmentUuid(departmentUuid);
  }

  // Branch Management
  async findEmployeesByBranch(branchId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByBranch(branchId);
  }

  async findEmployeesByBranchUuid(branchUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByBranchUuid(branchUuid);
  }

  // Job Position Management
  async findEmployeesByJobPosition(jobPositionId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByJobPosition(jobPositionId);
  }

  async findEmployeesByJobPositionUuid(jobPositionUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByJobPositionUuid(jobPositionUuid);
  }

  // Supervisor Management
  async findEmployeesBySupervisor(supervisorId: number): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesBySupervisor(supervisorId);
  }

  async findEmployeesBySupervisorUuid(supervisorUuid: string): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesBySupervisorUuid(supervisorUuid);
  }

  // Active/Inactive Management
  async findActiveEmployees(): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findActiveEmployees();
  }

  async findInactiveEmployees(): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findInactiveEmployees();
  }

  // Employment Period Management
  async findEmployeesByHireDateRange(startDate: string, endDate: string): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesByHireDateRange(startDate, endDate);
  }

  async dismissEmployee(uuid: string, dismissalDate: string): Promise<EmployeeResponseDto> {
    return this.employeeRepository.dismissEmployee(uuid, dismissalDate);
  }

  // User Association
  async findEmployeesWithUserAccount(): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesWithUserAccount();
  }

  async findEmployeesWithoutUserAccount(): Promise<EmployeeResponseDto[]> {
    return this.employeeRepository.findEmployeesWithoutUserAccount();
  }

  async associateUserAccount(uuid: string, userId: number): Promise<EmployeeResponseDto> {
    return this.employeeRepository.associateUserAccount(uuid, userId);
  }

  async disassociateUserAccount(uuid: string): Promise<EmployeeResponseDto> {
    return this.employeeRepository.disassociateUserAccount(uuid);
  }
} 