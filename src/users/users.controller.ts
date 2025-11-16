import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Get(':username')
  async getUsersById(@Param('username') username: string) {
    const findUser = await this.usersService.getUserByUsername(username);
    if(!findUser) throw new HttpException('User not found', 404);
    
    return findUser;
  }

  @Patch(':username')
  updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    const updateUser = this.usersService.updateUser(username, updateUserDto);
    if(!updateUser) throw new HttpException('User Not Found', 404);
  
    return updateUser;
  }

  @Delete(':username')
  async deleteUser(@Param('username') username: string) {
    const deletedUser = await this.usersService.deleteUser(username);
    if(!deletedUser) throw new HttpException('User Not Found', 404);

    return deletedUser;
  }
}