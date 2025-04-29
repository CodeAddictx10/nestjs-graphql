import { Module } from '@nestjs/common';
import { SubDepartmentsService } from './sub-departments.service';
import { SubDepartmentsResolver } from './sub-departments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from '@/modules/departments/entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { DepartmentsService } from '../departments/departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, SubDepartment])],
  providers: [
    SubDepartmentsResolver,
    SubDepartmentsService,
    DepartmentsService,
  ],
})
export class SubDepartmentsModule {}
