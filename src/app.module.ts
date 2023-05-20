import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';

// kết nối các module khác và controller, serivce lại với nhau
@Module({
  imports: [UserModule, ConfigModule.forRoot({ isGlobal: true }), AuthModule, ReviewModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
