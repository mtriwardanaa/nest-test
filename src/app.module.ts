import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { User } from './typeorm/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './typeorm/entities/Profile';
import { UserPost } from './typeorm/entities/Post';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.217.88',
      port: 3306,
      username: 'wsl',
      password: 'wslpass',
      database: 'nestjs_test',
      entities: [User, UserProfile, UserPost],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
