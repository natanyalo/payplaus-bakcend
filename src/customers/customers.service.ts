import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<Customer>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = await this.customerModel
        .findOne<Customer>({ email: createCustomerDto.email })
        .exec();

      if (customer) {
        throw new BadRequestException(
          `customer already exists ${customer.email}`,
        );
      }

      return new this.customerModel(createCustomerDto).save();
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return this.customerModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
