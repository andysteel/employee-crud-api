import { Employee } from '@models/employee.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PaginationEmployee } from '../types/application.types';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

  async saveEmployee(employee: Employee): Promise<Employee> {
    const entity = new Employee();
    entity.name = employee.name;
    entity.jobRole = employee.jobRole;
    entity.birth = employee.birth;
    entity.salary = employee.salary;
    this.validateRegistrationLength(employee);
    entity.employeeRegistration = employee.employeeRegistration;

    await entity.save();

    return entity;
  }

  async getAllEmployees(pagination: PaginationEmployee): Promise<Employee[]> {
    const { skip, take } = pagination;
    return await this.find({
      skip,
      take,
      order: {
        name: 'ASC',
      },
    });
  }

  async countEmployees(): Promise<number> {
    return await this.count();
  }

  async getEmployee(id: string): Promise<Employee | undefined> {
    return await this.findOne(id);
  }

  async removeEmployee(id: string): Promise<number | null | undefined> {
    return await this.delete({
      id,
    }).then(result => result.affected);
  }

  async updateEmployee(employee: Employee): Promise<Employee> {
    this.validateRegistrationLength(employee);
    return await this.save(employee);
  }

  private validateRegistrationLength(employee: Employee) {
    if (employee.employeeRegistration.toString().trim().length < 10) {
      throw new Error('The Registration must have 10 numbers');
    }
  }
}
