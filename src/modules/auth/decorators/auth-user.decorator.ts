import { User as UserEntity } from '@/modules/users/entities/user.entity';
import { IExpressRequest } from '@/types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator(
  (key: keyof UserEntity, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext() as IExpressRequest;
    if (!request.user) {
      return null;
    }

    if (key) {
      return request.user[key];
    }

    return request.user;
  },
);
