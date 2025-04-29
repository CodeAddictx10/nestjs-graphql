import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
  @IsInt()
  @Field(() => Int)
  departmentId: number;

  @MinLength(2)
  @Field()
  name: string;
}
