import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';



import { AuthModule } from './auth/auth.module';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/payplus'),
     AuthModule, CustomersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
