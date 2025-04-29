import { IsInt, MinLength } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDepartmentInput {
  @IsInt()
  @Field(() => Int)
  id: number;

  @MinLength(2)
  @Field()
  name: string;
}
