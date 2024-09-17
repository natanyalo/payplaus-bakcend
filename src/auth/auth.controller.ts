import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDtoLogin } from './dto/create-auth-login.dto';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  async login(
    @Body() createAuthDtoLogin: CreateAuthDtoLogin,
    @Res() res: Response,
  ) {
    const { accessToken, refreshTokens } = await this.authService.login(createAuthDtoLogin);
    res.cookie('refresh_token', refreshTokens, { httpOnly: true });
    return res.json({ access_token: accessToken });
  }

  @Post('refreshToken')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies['refresh_token'];
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }
    const newRefreshToken = await this.authService.refreshToken(refreshToken);
    return res.json({ access_token: newRefreshToken });
  }
}
