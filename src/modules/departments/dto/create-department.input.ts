import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, MinLength } from 'class-validator';

@InputType()
export class CreateDepartmentInput {
  @MinLength(2)
  @Field()
  name: string;

  @IsOptional()
  @MinLength(2, {
    each: true,
  })
  @Field(() => [String], { nullable: true })
  subDepartments?: string[];
}
