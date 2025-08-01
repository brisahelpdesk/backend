# Employee Module

This module provides comprehensive CRUD operations for employee management with support for complex organizational relationships, status management, and user account associations.

## Features

- **Complete CRUD Operations**: Create, Read, Update, Delete employees
- **Organizational Management**: Department, branch, job position relationships
- **Hierarchical Structure**: Supervisor-subordinate relationships
- **Status Management**: Active/inactive employee management
- **Employment Periods**: Hire date tracking and dismissal management
- **User Account Integration**: Associate/disassociate user accounts
- **Advanced Queries**: Search by various criteria and filters
- **Complex Relations**: Includes all related data (branch, department, status, etc.)

## API Endpoints

### Basic CRUD Operations

- `GET /employees` - Get all employees
- `GET /employees/:uuid` - Get specific employee by UUID
- `POST /employees` - Create new employee
- `PUT /employees/:uuid` - Update employee
- `DELETE /employees/:uuid` - Delete employee

### Search Operations

- `GET /employees/search/email?email=...` - Find employee by email
- `GET /employees/search/tax-id?taxId=...` - Find employee by tax ID (CPF)

### Status Management

- `PUT /employees/:uuid/activate` - Activate employee
- `PUT /employees/:uuid/deactivate` - Deactivate employee
- `GET /employees/status/active` - Get all active employees
- `GET /employees/status/inactive` - Get all inactive employees

### Department Management

- `GET /employees/department/:departmentId` - Get employees by department ID
- `GET /employees/department/uuid/:departmentUuid` - Get employees by department UUID

### Branch Management

- `GET /employees/branch/:branchId` - Get employees by branch ID
- `GET /employees/branch/uuid/:branchUuid` - Get employees by branch UUID

### Job Position Management

- `GET /employees/job-position/:jobPositionId` - Get employees by job position ID
- `GET /employees/job-position/uuid/:jobPositionUuid` - Get employees by job position UUID

### Supervisor Management

- `GET /employees/supervisor/:supervisorId` - Get employees by supervisor ID
- `GET /employees/supervisor/uuid/:supervisorUuid` - Get employees by supervisor UUID

### Employment Period Management

- `GET /employees/hired/range?startDate=...&endDate=...` - Get employees by hire date range
- `PUT /employees/:uuid/dismiss?dismissalDate=...` - Dismiss employee

### User Account Management

- `GET /employees/user-account/with` - Get employees with user accounts
- `GET /employees/user-account/without` - Get employees without user accounts
- `PUT /employees/:uuid/associate-user?userId=...` - Associate user account
- `PUT /employees/:uuid/disassociate-user` - Disassociate user account

## Data Models

### Employee Structure
```typescript
{
  uuid: string;
  individual_tax_id: string; // CPF
  internal_code?: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
  contact_email: string;
  extension_number?: string;
  hired_at: Date;
  dimissed_at?: Date;
  tb_branch: BranchDto;
  tb_department?: DepartmentDto;
  tb_employee_status: EmployeeStatusDto;
  tb_job_position: JobPositionDto;
  tb_user?: UserDto;
  tb_employee?: SupervisorDto; // Supervisor
  other_tb_employee: SubordinateDto[]; // Subordinates
}
```

## DTOs

### CreateEmployeeDto
- `individual_tax_id: string` - CPF (required)
- `internal_code?: string` - Internal employee code (optional)
- `user_id?: number` - Associated user ID (optional)
- `supervisor_id?: number` - Supervisor employee ID (optional)
- `department_id?: number` - Department ID (optional)
- `job_position_id: number` - Job position ID (required)
- `branch_id: number` - Branch ID (required)
- `employee_status_id: number` - Employee status ID (required)
- `first_name: string` - First name (required)
- `last_name: string` - Last name (required)
- `is_active?: boolean` - Whether employee is active (optional, default: true)
- `hired_at: string` - Hire date (required)
- `dimissed_at?: string` - Dismissal date (optional)
- `contact_email: string` - Contact email (required)
- `extension_number?: string` - Extension number (optional)

### UpdateEmployeeDto
All fields are optional for partial updates.

### EmployeeResponseDto
Includes comprehensive relations and helper methods:
- `fullName: string` - Full name of employee
- `hasSupervisor: boolean` - Whether employee has a supervisor
- `hasSubordinates: boolean` - Whether employee has subordinates
- `subordinatesCount: number` - Number of subordinates
- `hasUserAccount: boolean` - Whether employee has user account
- `isDismissed: boolean` - Whether employee is dismissed

## Database Operations

### Complex Relations
The employee module handles complex relationships:
- **Branch**: Employee belongs to a branch
- **Department**: Employee may belong to a department
- **Job Position**: Employee has a specific job position
- **Employee Status**: Employee has a status (active, inactive, etc.)
- **Supervisor**: Employee may have a supervisor
- **Subordinates**: Employee may have subordinates
- **User Account**: Employee may be associated with a user account

### Query Optimization
- All queries include necessary relations
- Proper indexing on frequently queried fields
- Efficient filtering by various criteria

## Example Usage

### Creating an Employee
```typescript
const employee = await this.employeeService.create({
  individual_tax_id: '12345678901',
  internal_code: 'EMP001',
  job_position_id: 1,
  branch_id: 1,
  employee_status_id: 1,
  first_name: 'John',
  last_name: 'Doe',
  hired_at: '2023-01-15',
  contact_email: 'john.doe@company.com',
  extension_number: '1001'
});
```

### Finding Employees by Department
```typescript
const departmentEmployees = await this.employeeService.findEmployeesByDepartment(1);
```

### Managing Employee Status
```typescript
// Activate employee
const activatedEmployee = await this.employeeService.activateEmployee('employee-uuid');

// Deactivate employee
const deactivatedEmployee = await this.employeeService.deactivateEmployee('employee-uuid');
```

### Dismissing an Employee
```typescript
const dismissedEmployee = await this.employeeService.dismissEmployee(
  'employee-uuid',
  '2024-01-15'
);
```

### User Account Management
```typescript
// Associate user account
const employeeWithUser = await this.employeeService.associateUserAccount(
  'employee-uuid',
  123
);

// Disassociate user account
const employeeWithoutUser = await this.employeeService.disassociateUserAccount(
  'employee-uuid'
);
```

### Advanced Queries
```typescript
// Find employees hired in date range
const recentHires = await this.employeeService.findEmployeesByHireDateRange(
  '2023-01-01',
  '2023-12-31'
);

// Find employees with user accounts
const employeesWithAccounts = await this.employeeService.findEmployeesWithUserAccount();

// Find employees by supervisor
const subordinates = await this.employeeService.findEmployeesBySupervisorUuid(
  'supervisor-uuid'
);
```

### Using Helper Methods
```typescript
const employee = await this.employeeService.findOne('employee-uuid');

console.log(employee.fullName); // "John Doe"
console.log(employee.hasSupervisor); // true/false
console.log(employee.hasSubordinates); // true/false
console.log(employee.subordinatesCount); // 5
console.log(employee.hasUserAccount); // true/false
console.log(employee.isDismissed); // true/false
```

## Error Handling

- `NotFoundException` - When employee is not found
- Proper validation errors for invalid data
- Transaction safety for complex operations

## Dependencies

- `@nestjs/common` - NestJS core functionality
- `class-transformer` - DTO transformation
- `class-validator` - DTO validation
- `@nestjs/swagger` - API documentation

## Performance Considerations

- Complex queries include all necessary relations
- Proper database indexing on frequently queried fields
- Efficient filtering and pagination support
- Transaction safety for data integrity 