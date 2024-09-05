import { Prop,Schema, SchemaFactory } from "@nestjs/mongoose"


@Schema()
export class Meals {
    @Prop()
    idStor:string
    @Prop()
    name:string
    @Prop()
    description:string
    @Prop()
    price:number;
    @Prop()
    image:string 

}

export const MealsSchema = SchemaFactory.createForClass(Meals);//
//a
//b 
//c