import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import mongoose from "mongoose";

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

  @Get(':id')
  async getUsersById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid Id', 400);

    const findUser = await this.usersService.getUserById(id);
    if(!findUser) throw new HttpException('User not found', 404);
    
    return findUser;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid Id', 400);

    const updateUser = this.usersService.updateUser(id, updateUserDto);
    if(!updateUser) throw new HttpException('User Not Found', 404);
  
    return updateUser;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid Id', 400);

    const deletedUser = await this.usersService.deleteUser(id);
    if(!deletedUser) throw new HttpException('User Not Found', 404);

    return deletedUser;
  }
}