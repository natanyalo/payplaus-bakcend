import { Module } from '@nestjs/common';
import { StorsService } from './stors.service';
import { StorsController } from './stors.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Coordinates, CoordinatesSchema, Stor, StorSchema } from './entities/stor.entity';
import { MealsModule } from './meals/meals.module';

@Module({
  imports:[MongooseModule.forFeature([{name:Stor.name, schema:StorSchema},{name:Coordinates.name, schema:CoordinatesSchema}]), MealsModule],
  controllers: [StorsController],
  providers: [StorsService],
})
export class StorsModule {}
