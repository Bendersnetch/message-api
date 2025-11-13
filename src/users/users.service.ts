import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/User.schema";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";
import { CreateUserSettingDto } from "src/userSettings/dto/CreateUserSetting.dto";
import { UserSetting } from "src/schemas/UserSetting.schema";

@Injectable()
export class UsersService {
  constructor (@InjectModel(User.name) private userModel: Model<User>, @InjectModel(UserSetting.name) private userSettingModel: Model<UserSetting>) {}

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

  getUserById(id: string) {
    return this.userModel.findById(id).populate('settings');
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, {$set: updateUserDto}, {new: true});
  }

  deleteUser(id: string) {
    return this.userModel.findByIdAndDelete(id)
  }
}