import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from 'mongoose';

export enum Category{
    Amrikai="Amrikai",
    Morning="Morning",
    Healthy="Healthy",
    Coffee="Coffee"
}
@Schema()
export class Coordinates extends Document{
    @Prop()
    lat:string
    @Prop()
    lon:string
}



@Schema()
export class Stor extends Document {
    @Prop()
    idUser:string
    @Prop()
    name:string
    @Prop()
    category:Category
    @Prop()
    score:number
    @Prop()
    address:Coordinates
    @Prop()
    timeAvailable: [number, number];

}

export const StorSchema = SchemaFactory.createForClass(Stor);
export const CoordinatesSchema = SchemaFactory.createForClass(Coordinates);


