import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UseInterceptors,
} from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userModel
        .findOne<User>({ email: createUserDto.email })
        .exec();

      if (user) {
        throw new BadRequestException(`user already exists ${user.email}`);
      }

      return new this.userModel(createUserDto).save();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findOne<User>({ id: id }).exec();
  }
  async findOneByEmail(email: string) {
    return this.userModel.findOne<User>({ email }).exec();
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ email }, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
