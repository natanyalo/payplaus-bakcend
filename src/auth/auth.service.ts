import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';

import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateAuthDtoLogin } from './dto/create-auth-login.dto';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(createAuthDto: CreateAuthDto) {
    const user = await this.userServices.findOneByEmail(createAuthDto.email);
    if (user) {
      throw new BadRequestException(
        `user's email already exists:{${createAuthDto.email}}`,
      );
    }
    const hashPassword = await bcrypt.hash(createAuthDto.password,3);
     await this.userServices.create({
      ...createAuthDto,
      hashPassword: hashPassword,
    });
  }

  async login(createAuthDtoLogin: CreateAuthDtoLogin) {
    const user = await this.verifyToken(createAuthDtoLogin);
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    const refreshTokens = this.jwtService.sign(payload, { expiresIn: '7d' });
    await this.userServices.update(user.email, {  refreshTokens });
    
    return { accessToken, refreshTokens };
  }

  async refreshToken(refreshToken:string ) {
    try {
      const payload=await this.jwtService.verify(refreshToken);
      const newPayload={email:payload.email,sub:payload.sub};
      const newAccessToken=this.jwtService.sign(newPayload);
      return newAccessToken;
    } catch (error) {
      throw new BadRequestException('refresh token is not valid');
    }
  
  }

  async verifyToken(createAuthDtoLogin: CreateAuthDtoLogin) {
    const user = await this.userServices.findOneByEmail(createAuthDtoLogin.email);
    if (!user) {
      throw new BadRequestException(
        `user email does not exist :{${createAuthDtoLogin.email}}`,
      );
    }
    const isMatch = await bcrypt.compare(
      createAuthDtoLogin.password,
      user.hashPassword,
    );
    if (isMatch) {
      return user;
    }
    throw new BadRequestException('password is not correct');
  }
}
