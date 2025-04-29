import { Injectable } from '@nestjs/common';
import { CreateSubDepartmentInput } from './dto/create-sub-department.input';
import { UpdateSubDepartmentInput } from './dto/update-sub-department.input';
import { SubDepartment } from './entities/sub-department.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubDepartmentsService {
  constructor(
    @InjectRepository(SubDepartment)
    private readonly subDepartmentRepository: Repository<SubDepartment>,
  ) {}
  async create(
    createSubDepartmentInput: CreateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const newSubDepartment = this.subDepartmentRepository.create({
      ...createSubDepartmentInput,
    });
    return await this.subDepartmentRepository.save(newSubDepartment);
  }

  async findAll(): Promise<SubDepartment[]> {
    return await this.subDepartmentRepository.find({});
  }

  async findOne(id: number): Promise<SubDepartment> {
    return await this.subDepartmentRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(
    id: number,
    updateSubDepartmentInput: UpdateSubDepartmentInput,
  ): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOneOrFail({
      where: { id },
    });

    Object.assign(subDepartment, { ...updateSubDepartmentInput });
    await this.subDepartmentRepository.save(subDepartment);

    return subDepartment;
  }

  async remove(id: number): Promise<boolean> {
    const deleteResult = await this.subDepartmentRepository.delete({ id });
    return Boolean(deleteResult.affected);
  }
}
