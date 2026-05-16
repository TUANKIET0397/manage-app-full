import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ReviewsModule } from './modules/reviews/reviews.module';

@Module({
  imports: [UsersModule, 
  ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRootAsync({
  imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
  }),
  ReviewsModule
  ],
    
  controllers: [AppController],
  providers: [AppService],
  
}

)


export class AppModule {}
