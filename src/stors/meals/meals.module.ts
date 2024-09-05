import { Module } from '@nestjs/common';
import { MealsService } from './meals.service';
import { MealsController } from './meals.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meals, MealsSchema } from './entities/meal.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:Meals.name, schema:MealsSchema}]) , MealsModule],
  controllers: [MealsController],
  providers: [MealsService],
})
export class MealsModule {}
