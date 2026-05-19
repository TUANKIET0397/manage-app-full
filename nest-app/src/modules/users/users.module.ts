import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  // Register the User model with Mongoose, có nghĩa là chúng ta sẽ sử dụng UserSchema để tạo ra một collection trong MongoDB có tên là 'users'
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], //export UsersService để có thể sử dụng trong các module khác, ví dụ như AuthModule để xác thực người dùng khi đăng nhập, hoặc các module khác cần truy cập thông tin người dùng để thực hiện các thao tác liên quan đến người dùng.
})
export class UsersModule {}
