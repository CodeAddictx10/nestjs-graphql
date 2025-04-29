import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { SubDepartmentsService } from './sub-departments.service';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { Department } from '../departments/entities/department.entity';
import { DepartmentsService } from '../departments/departments.service';

@Resolver(() => SubDepartment)
export class SubDepartmentsResolver {
  constructor(
    private readonly subDepartmentsService: SubDepartmentsService,
    private readonly departmentService: DepartmentsService,
  ) {}

  @Mutation(() => SubDepartment)
  async createSubDepartment(
    @Args('createSubDepartmentInput')
    createSubDepartmentInput: CreateSubDepartmentInput,
  ) {
    return await this.subDepartmentsService.create(createSubDepartmentInput);
  }

  @Query(() => [SubDepartment], { name: 'getSubDepartments' })
  async findAll() {
    return await this.subDepartmentsService.findAll();
  }

  @Query(() => SubDepartment, { name: 'getSubDepartmentById' })
  async findOne(@Args('id', { type: () => Int }) id: number) {
    return await this.subDepartmentsService.findOne(id);
  }

  @Mutation(() => SubDepartment)
  async updateSubDepartment(
    @Args('updateSubDepartmentInput')
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ) {
    return await this.subDepartmentsService.update(
      updateSubDepartmentInput.id,
      updateSubDepartmentInput,
    );
  }

  @Mutation(() => Boolean, { name: 'deleteSubCategory' })
  async removeSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return await this.subDepartmentsService.remove(id);
  }

  @ResolveField(() => Department, { name: 'department' })
  async getDepartment(@Parent() subDepartment: SubDepartment) {
    return this.departmentService.findOne(subDepartment.departmentId);
  }
}
