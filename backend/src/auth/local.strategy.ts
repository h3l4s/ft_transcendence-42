import { Strategy } from 'passport-42';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService)
  {
    super({
        clientID: process.env.FORTYTWO_CLIENT_ID,
		clientSecret: process.env.FORTYTWO_CLIENT_SECRET,
		callbackURL: 'http://localhost:8080'
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any) 
  {
    console.log(accessToken);
	console.log(profile);
      return accessToken;
  }
}
