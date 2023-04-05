import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) { }


  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOne(
      {
        where: {
          id
        }
      }
    );
  }

  findOneByEmail = async (email: string) => this.userRepository.findOne({ where: { email } });

  findOneByPhone = async (phone: string) => this.userRepository.findOne({ where: { phone } });


  findOneByEmailOrPhone = async (email: string, phone: string) =>
    this.userRepository.findOne(
      {
        where: [
          { email: email },
          { phone: phone }
        ]
      }
    );

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }
}
