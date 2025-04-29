import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateDepartmentInput } from './dto/create-department.input';
import { UpdateDepartmentInput } from './dto/update-department.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private readonly departmentRepository: Repository<Department>,
  ) {}

  async create({
    name,
    subDepartments,
  }: CreateDepartmentInput): Promise<Department> {
    try {
      const department = this.departmentRepository.create({
        name,
        subDepartments: subDepartments?.map((name) => ({ name })),
      });

      return await this.departmentRepository.save(department);
    } catch (error) {
      if (error.code == '23505') {
        throw new ConflictException(
          'Duplicate name found.',
        );
      }
      
      throw new InternalServerErrorException('Unexpected error');
    }
  }

  async findAll() {
    return await this.departmentRepository.find();
  }

  async findOne(id: number) {
    return await this.departmentRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    { name }: UpdateDepartmentInput,
  ): Promise<Department> {
    const department = await this.departmentRepository.findOneOrFail({
      where: { id },
    });

    department.name = name;
    await this.departmentRepository.save(department);

    return department;
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.departmentRepository.delete({ id });
    console.log(deleteResult, 'hdgjhdj');
    
    return Boolean(deleteResult.affected);
  }
}
