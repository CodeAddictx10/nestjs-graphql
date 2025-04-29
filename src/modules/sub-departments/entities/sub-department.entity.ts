import { Department } from '@/modules/departments/entities/department.entity';
import { ObjectType, Field, Int, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sub_departments' })
@Unique(['name', 'departmentId'])
@ObjectType()
export class SubDepartment {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  departmentId: number;

  @Column()
  @Field()
  name: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @ManyToOne(() => Department, (department) => department.subDepartments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'departmentId' })
  @Field(() => Department, { nullable: true })
  department: Department;
}
