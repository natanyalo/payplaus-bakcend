import { Injectable } from '@nestjs/common';
import { CreateStorDto } from './dto/create-stor.dto';
import { UpdateStorDto } from './dto/update-stor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stor } from './entities/stor.entity';

@Injectable()
export class StorsService {

  constructor(@InjectModel(Stor.name) private StorModule:Model<Stor> ){}

  async create(createStorDto: CreateStorDto) {
     const stor= new  this.StorModule(createStorDto)
     return stor.save()
  }

  findAll() {
    return `This action returns all stors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stor`;
  }

  update(id: number, updateStorDto: UpdateStorDto) {
    return `This action updates a #${id} stor`;
  }

  remove(id: number) {
    return `This action removes a #${id} stor`;
  }
}
