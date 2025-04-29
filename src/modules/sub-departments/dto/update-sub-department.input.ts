import { CreateSubDepartmentInput } from './create-sub-department.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSubDepartmentInput extends PartialType(CreateSubDepartmentInput) {
  @Field(() => Int)
  id: number;
}
