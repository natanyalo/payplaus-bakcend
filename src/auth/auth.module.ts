import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { UsersService } from './users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService ,JwtAuthGuard,UsersService,],
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), 
    JwtModule.register({
    secret: 'your-secret-key',
    signOptions: { expiresIn: '15m' },
  }),],
  exports:[JwtAuthGuard, JwtModule]
})
export class AuthModule {}
