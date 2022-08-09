import { Module } from '@nestjs/common';
import { ChanModule } from './chan/chan.module';
import { UserModule } from './user/user.module';

@Module({
	imports: [UserModule, ChanModule],
})
export class ApiModule { }
