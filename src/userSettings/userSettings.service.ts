import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSetting } from "src/schemas/UserSetting.schema";
import { CreateUserSettingDto } from "./dto/CreateUserSetting.dto";

@Injectable()
export class UsersSettingsService {
  constructor (@InjectModel(UserSetting.name) private userSettingModel: Model<UserSetting>) {}

  async createUserSetting(createUserSettingDto: CreateUserSettingDto) { 
    const newUserSetting = new this.userSettingModel(createUserSettingDto);
    const saved = await newUserSetting.save()
    return saved;
  }

  getUserSettingsById(id: string) {
    return this.userSettingModel.findById(id);
  }

  deleteUserSettings(id: string) {
    return this.userSettingModel.findByIdAndDelete(id)
  }
}