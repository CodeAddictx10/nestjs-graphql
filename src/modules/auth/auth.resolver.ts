import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { User } from '@/modules/users/entities/user.entity';
import { LoginInput } from './dto/login.input';
import { UsersService } from '@/modules/users/users.service';
import { Public } from '@/common/decorators/is-public';
import { AuthUser } from './decorators/auth-user.decorator';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Mutation(() => User)
  async signUp(@Args('payload') payload: CreateAuthInput) {
    return await this.userService.create(payload);
  }

  @Public()
  @Mutation(() => Auth)
  async login(@Args('payload') payload: LoginInput) {
    return await this.authService.login(payload);
  }

  @Query(() => User, { nullable: true, name: 'getCurrentUser' })
  auth(@AuthUser() user: User) {
    return user;
  }
}
