import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { PostUserDto } from '../../dtos/PostUser.dto';
import { ProfileUserDto } from '../../dtos/ProfileUser.dto';
import { ValidateCreateUserPipe } from '../../pipes/validate-create-user.pipe';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getUsers() {
    return this.userService.fetchUser();
  }

  @Post('create')
  @UsePipes(new ValidationPipe())
  createUser(@Body(ValidateCreateUserPipe) userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.fetchUserById(id);
    if (!user)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

    return user;
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() userUpdate: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, userUpdate);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Post(':id/profile')
  userProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() userProfile: ProfileUserDto,
  ) {
    return this.userService.userProfile(id, userProfile);
  }

  @Post(':id/post')
  userPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() userPost: PostUserDto,
  ) {
    return this.userService.userPost(id, userPost);
  }
}
