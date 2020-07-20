import { HttpModule, Module } from '@nestjs/common';
import { CommonModule } from 'modules/common/module';
import { DatabaseModule } from 'modules/database/module';

import { AuthController } from './controllers/auth';
import { OrdersController } from './controllers/order';
import { ProfileController } from './controllers/profile';
import { DeviceRepository } from './repositories/device';
import { OrderRepository } from './repositories/order';
import { UserRepository } from './repositories/user';
import { AuthService } from './services/auth';
import { UserService } from './services/user';

@Module({
  imports: [HttpModule, CommonModule, DatabaseModule],
  controllers: [AuthController, ProfileController, OrdersController],
  providers: [AuthService, UserService, UserRepository, DeviceRepository, OrderRepository]
})
export class AppModule {}
