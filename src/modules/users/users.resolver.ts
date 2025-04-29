import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { AuthUser } from '@/modules/auth/decorators/auth-user.decorator';

@Resolver(() => User)
export class UsersResolver {}
