import { Body, Controller, Delete, Get, HttpException, Param, Post } from "@nestjs/common";
import { CreateUserSettingDto } from "./dto/CreateUserSetting.dto";
import { UsersSettingsService } from "./userSettings.service";
import mongoose from "mongoose";

@Controller('users/settings')
export class UsersSettingsController {
  constructor(private usersSettingsService: UsersSettingsService) {}

  @Post()
  createUserSettings(@Body() createUserSettingsDto: CreateUserSettingDto) {
    return this.usersSettingsService.createUserSetting(createUserSettingsDto);
  }

  @Get(':id')
  async getUsersById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid Id', 400);

    const findUserSettings = await this.usersSettingsService.getUserSettingsById(id);
    if(!findUserSettings) throw new HttpException('User Settings not found', 404);
    
    return findUserSettings;
  }

  @Delete(':id')
  async deleteUserSettings(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if(!isValid) throw new HttpException('Invalid Id', 400);

    const deletedUser = await this.usersSettingsService.deleteUserSettings(id);
    if(!deletedUser) throw new HttpException('User Not Found', 404);

    return deletedUser;
  }
}