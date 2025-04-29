import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateAuthInput {
  @IsNotEmpty()
  @Field()
  username: string;

  @Field()
  @IsString()
  @MinLength(6)
  password: string;
}
