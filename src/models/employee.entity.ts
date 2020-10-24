import {
  BaseEntity, Entity, PrimaryGeneratedColumn, Column,
} from 'typeorm';

@Entity('employee', { schema: 'employee_crud' })
export class Employee extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column({ name: 'name', length: 255, nullable: false })
    name!: string;

    @Column({ name: 'job_role', length: 255, nullable: false })
    jobRole!: string;

    @Column({
      name: 'salary', type: 'decimal', precision: 12, scale: 2, nullable: false,
    })
    salary!: number;

    @Column({ name: 'birth', type: 'date', nullable: false })
    birth!: Date;

    @Column({
      name: 'employee_registration', type: 'bigint', nullable: false, unique: true,
    })
    employeeRegistration!: number;
}
