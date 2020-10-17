import { Employee } from '@src/models/employee.entity';
import { PaginationEmployee } from '@src/types/application.types';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Employee)
export class EmployeeRepository extends Repository<Employee> {

  async saveEmployee(employee: Employee): Promise<Employee> {
    const entity = new Employee();
    entity.name = employee.name;
    entity.jobRole = employee.jobRole;
    entity.birth = employee.birth;
    entity.salary = employee.salary;
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

  async getEmployee(id: string): Promise<Employee | undefined> {
    return await this.findOne(id);
  }

  async removeEmployee(id: string): Promise<number | null | undefined> {
    return await this.delete({
      id,
    }).then(result => result.affected);
  }

  async updateEmployee(employee: Employee): Promise<Employee> {
    return await this.save(employee);
  }
}
