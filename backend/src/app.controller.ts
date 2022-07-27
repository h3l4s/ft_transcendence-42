import { Controller, Request,Redirect,Res, Post,Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// import { AuthService } from './auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { Router} from 'express';

@Controller()
export class AppController {

  router: Router;
  @Get('/auth/42/callback')
  async login(@Res() res, @Request() req)
  {
    res.redirect('http://localhost:3001/?token='+req.user);
  }
  
  @Get('/')
  async wlcome() {
    return "welcome"
  }
}
