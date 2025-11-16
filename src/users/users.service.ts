import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { UserSetting } from "src/schemas/UserSetting.schema";
import { UsersSettingsService } from "src/userSettings/userSettings.service";

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<User>, @InjectModel(UserSetting.name) private userSettingModel: Model<UserSetting>, private userSettingService: UsersSettingsService) {}

  async createUser({settings, ...createUserDto}: CreateUserDto) {
    const newSettings = new this.userSettingModel(settings)
    const savedNewSettings = await newSettings.save()

    const newUser = new this.userModel({
      ...createUserDto,
      settings: savedNewSettings._id
    });
    return newUser.save();
  }

  getUsers() {
    return this.userModel.find().populate('settings')
  }

  getUserByUsername(username: string) {
    return this.userModel.findOne({"username": username}).populate('settings');
  }

  async updateUser(username: string, {settings, ...updateUserDto}: UpdateUserDto) {
    
    if(settings) {
      const newUserSetting = await this.userSettingService.updateUserSetting(settings)
    }

    return this.userModel.findOneAndUpdate({"username": username}, {$set: updateUserDto}, {new: true}).populate('settings');
  }

  deleteUser(username: string) {
    return this.userModel.findOneAndDelete({"username": username})
  }
}