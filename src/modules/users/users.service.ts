import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { hash } from 'argon2';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create({ username, password }: CreateUserInput) {
    const hashedPassword = await hash(password);

    const newUser = new User();
    Object.assign(newUser, { username, password: hashedPassword });

    return await this.userRepository.save(newUser);
  }
  async findAll() {
    return await this.userRepository.find({});
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: {
        username: Raw((alias) => `LOWER(${alias}) = LOWER(:value)`, {
          value: username,
        }),
      },
      select: { password: true },
    });
  }
}
