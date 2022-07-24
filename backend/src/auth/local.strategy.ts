import { Strategy } from 'passport-42';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService)
  {
    super({
        clientID: "cbd1064bd58ef5065a103fbd35e3b251f506b89d0f101660714907581d0c9bd9",
        clientSecret: "",
        callbackURL: "http://localhost:8080",
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: any) 
  {
    console.log(accessToken);
      return accessToken;
  }
}
