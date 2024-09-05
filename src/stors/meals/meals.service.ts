import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateMealDto } from './dto/create-meal.dto';
import { UpdateMealDto } from './dto/update-meal.dto';
import { Model } from 'mongoose';
import { Meals } from './entities/meal.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MealsService {
  constructor(@InjectModel(Meals.name) private mealsModel: Model<Meals>) {}

  async create(createMealDto: CreateMealDto, id:string) {
    const meals = new this.mealsModel({...createMealDto, idStor:id})
    return meals.save();
  }


  async findAll() {
    return this.mealsModel.find({}).exec();
  }

  async findOne(id: number) {
    return this.mealsModel.findOne({ _id: id }).exec();
  }

  async update(id: number, updateMealDto: UpdateMealDto) {
    try {
      const updateMeals = this.mealsModel.findOneAndUpdate(
        { _id: id },
        updateMealDto,
      );
      if (!updateMeals) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
    } catch (error) {
      console.log('error');
      throw new InternalServerErrorException();
    }
  }

  async remove(id: number) {
    try {
    } catch (e) {}
  }
}
