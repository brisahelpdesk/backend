import { Injectable, NotFoundException } from '@nestjs/common';
import { PersistenceService } from '../persistence/persistence.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeResponseDto } from './dto/employee-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EmployeeRepository {
  constructor(private readonly persistence: PersistenceService) {}

  async create(data: CreateEmployeeDto): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.create({
      data: {
        individual_tax_id: data.individual_tax_id,
        internal_code: data.internal_code,
        user_id: data.user_id,
        supervisor_id: data.supervisor_id,
        department_id: data.department_id,
        job_position_id: data.job_position_id,
        branch_id: data.branch_id,
        employee_status_id: data.employee_status_id,
        first_name: data.first_name,
        last_name: data.last_name,
        is_active: data.is_active ?? true,
        hired_at: new Date(data.hired_at),
        dimissed_at: data.dimissed_at ? new Date(data.dimissed_at) : null,
        contact_email: data.contact_email,
        extension_number: data.extension_number,
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true });
  }

  async findAll(): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findOne(uuid: string): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({
      where: { uuid },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    if (!employee) throw new NotFoundException('Employee not found');

    return plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true });
  }

  async findByEmail(email: string): Promise<EmployeeResponseDto | null> {
    const employee = await this.persistence.tb_employee.findFirst({
      where: { contact_email: email },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    if (!employee) return null;

    return plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true });
  }

  async findByTaxId(taxId: string): Promise<EmployeeResponseDto | null> {
    const employee = await this.persistence.tb_employee.findUnique({
      where: { individual_tax_id: taxId },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    if (!employee) return null;

    return plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true });
  }

  async update(uuid: string, data: UpdateEmployeeDto): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({ where: { uuid } });
    if (!employee) throw new NotFoundException('Employee not found');

    const updateData: any = {};
    
    if (data.individual_tax_id) updateData.individual_tax_id = data.individual_tax_id;
    if (data.internal_code) updateData.internal_code = data.internal_code;
    if (data.user_id !== undefined) updateData.user_id = data.user_id;
    if (data.supervisor_id !== undefined) updateData.supervisor_id = data.supervisor_id;
    if (data.department_id !== undefined) updateData.department_id = data.department_id;
    if (data.job_position_id) updateData.job_position_id = data.job_position_id;
    if (data.branch_id) updateData.branch_id = data.branch_id;
    if (data.employee_status_id) updateData.employee_status_id = data.employee_status_id;
    if (data.first_name) updateData.first_name = data.first_name;
    if (data.last_name) updateData.last_name = data.last_name;
    if (data.is_active !== undefined) updateData.is_active = data.is_active;
    if (data.hired_at) updateData.hired_at = new Date(data.hired_at);
    if (data.dimissed_at !== undefined) updateData.dimissed_at = data.dimissed_at ? new Date(data.dimissed_at) : null;
    if (data.contact_email) updateData.contact_email = data.contact_email;
    if (data.extension_number !== undefined) updateData.extension_number = data.extension_number;

    const updated = await this.persistence.tb_employee.update({
      where: { uuid },
      data: updateData,
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, updated, { excludeExtraneousValues: true });
  }

  async delete(uuid: string): Promise<void> {
    try {
      await this.persistence.tb_employee.delete({ where: { uuid } });
    } catch (e) {
      throw new NotFoundException('Employee not found');
    }
  }

  async activateEmployee(uuid: string): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({ where: { uuid } });
    if (!employee) throw new NotFoundException('Employee not found');

    const updated = await this.persistence.tb_employee.update({
      where: { uuid },
      data: { is_active: true },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, updated, { excludeExtraneousValues: true });
  }

  async deactivateEmployee(uuid: string): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({ where: { uuid } });
    if (!employee) throw new NotFoundException('Employee not found');

    const updated = await this.persistence.tb_employee.update({
      where: { uuid },
      data: { is_active: false },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, updated, { excludeExtraneousValues: true });
  }

  async findEmployeesByDepartment(departmentId: number): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: { department_id: departmentId },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesByDepartmentUuid(departmentUuid: string): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        tb_department: {
          uuid: departmentUuid,
        },
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesByBranch(branchId: number): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: { branch_id: branchId },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesByBranchUuid(branchUuid: string): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        tb_branch: {
          uuid: branchUuid,
        },
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesByJobPosition(jobPositionId: number): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: { job_position_id: jobPositionId },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesByJobPositionUuid(jobPositionUuid: string): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        tb_job_position: {
          uuid: jobPositionUuid,
        },
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesBySupervisor(supervisorId: number): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: { supervisor_id: supervisorId },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesBySupervisorUuid(supervisorUuid: string): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        tb_employee: {
          uuid: supervisorUuid,
        },
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findActiveEmployees(): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: { is_active: true },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findInactiveEmployees(): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: { is_active: false },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesByHireDateRange(startDate: string, endDate: string): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        hired_at: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async dismissEmployee(uuid: string, dismissalDate: string): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({ where: { uuid } });
    if (!employee) throw new NotFoundException('Employee not found');

    const updated = await this.persistence.tb_employee.update({
      where: { uuid },
      data: { 
        dimissed_at: new Date(dismissalDate),
        is_active: false,
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, updated, { excludeExtraneousValues: true });
  }

  async findEmployeesWithUserAccount(): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        user_id: {
          not: null,
        },
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async findEmployeesWithoutUserAccount(): Promise<EmployeeResponseDto[]> {
    const employees = await this.persistence.tb_employee.findMany({
      where: {
        user_id: null,
      },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return employees.map((employee) => plainToInstance(EmployeeResponseDto, employee, { excludeExtraneousValues: true }));
  }

  async associateUserAccount(uuid: string, userId: number): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({ where: { uuid } });
    if (!employee) throw new NotFoundException('Employee not found');

    const updated = await this.persistence.tb_employee.update({
      where: { uuid },
      data: { user_id: userId },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, updated, { excludeExtraneousValues: true });
  }

  async disassociateUserAccount(uuid: string): Promise<EmployeeResponseDto> {
    const employee = await this.persistence.tb_employee.findUnique({ where: { uuid } });
    if (!employee) throw new NotFoundException('Employee not found');

    const updated = await this.persistence.tb_employee.update({
      where: { uuid },
      data: { user_id: null },
      include: {
        tb_branch: true,
        tb_department: true,
        tb_employee_status: true,
        tb_job_position: true,
        tb_user: true,
        tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
        other_tb_employee: {
          include: {
            tb_branch: true,
            tb_department: true,
            tb_employee_status: true,
            tb_job_position: true,
          },
        },
      },
    });

    return plainToInstance(EmployeeResponseDto, updated, { excludeExtraneousValues: true });
  }
} 