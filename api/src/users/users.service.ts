import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPwd } from 'src/utils';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create({
      ...createUserDto,
      password: await hashPwd(createUserDto.password),
    });
    try {
      return await this.usersRepository.save(user);
    } catch (err) {
      if (err.code === '23505')
        throw new BadRequestException('email is already taken');
      throw err;
    }
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOneBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.preload({ id, ...updateUserDto });
    return this.usersRepository.save(user);
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
