import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

// modules
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { LikesModule } from './modules/likes/likes.module';
import { MenuItemOptionsModule } from './modules/menu.item.options/menu.item.options.module';
import { MenuItemsModule } from './modules/menu.items/menu.items.module';
import { MenusModule } from './modules/menus/menus.module';
import { OrderDetailModule } from './modules/order.detail/order.detail.module';
import { OrdersModule } from './modules/orders/orders.module';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { AuthModule } from './auth/auth.module';

//schemas, import dùng để tạo các mô hình dữ liệu trong MongoDB thông qua Mongoose,
//  giúp định nghĩa cấu trúc và kiểu dữ liệu của các tài liệu trong cơ sở dữ liệu.
// sau khi định nghĩa các schema, khai báo chúng trong AppModule để có thể sử dụng chúng trong toàn bộ ứng dụng NestJS của bạn.
@Module({
  imports: [
    UsersModule,
    LikesModule,
    MenuItemOptionsModule,
    MenuItemsModule,
    MenusModule,
    OrderDetailModule,
    OrdersModule,
    RestaurantsModule,
    ReviewsModule,
    // cấu hình kết nối đến MongoDB bằng cách sử dụng MongooseModule.forRootAsync() và ConfigModule để lấy URI từ biến môi trường.
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    ReviewsModule,
    OrdersModule,
    OrderDetailModule,
    MenusModule,
    MenuItemsModule,
    MenuItemOptionsModule,
    LikesModule,
    RestaurantsModule,
    AuthModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
