import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ReviewModule } from './review/review.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoomModule } from './room/room.module';
import { LocationModule } from './location/location.module';

// kết nối các module khác và controller, serivce lại với nhau
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ReviewModule,
    JwtModule.register({}),
    RoomModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
