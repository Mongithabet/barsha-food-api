import { CacheModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MemoryStoreService } from 'src/shared/services/memory-store.service';
import { SharedModule } from 'src/shared/shared.module';
import { AdminsService } from 'src/users/services/admins.service';
import { CustomersService } from 'src/users/services/customers.service';
import { DeliveryMansService } from 'src/users/services/delivery-mans.service';
import { UsersService } from 'src/users/services/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.SECRET_KEY_JWT,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    SharedModule,
    CacheModule.register({ ttl: null }),],
  controllers: [AuthController],
  providers: [AuthService,
    CustomersService,
    JwtStrategy,
    UsersService,
    DeliveryMansService,
    AdminsService,
    MemoryStoreService]
})
export class AuthModule { }
