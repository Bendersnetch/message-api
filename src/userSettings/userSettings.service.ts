import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSetting } from "src/schemas/UserSetting.schema";
import { CreateUserSettingDto } from "./dto/CreateUserSetting.dto";
import { UpdateUserSettingDto } from "./dto/UpdateUserSetting.dto";

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

  updateUserSetting({_id, ...updateUserSettingDto}: UpdateUserSettingDto) {
    return this.userSettingModel.findByIdAndUpdate(_id, {$set: updateUserSettingDto}, {new: true});
  }

  deleteUserSettings(id: string) {
    return this.userSettingModel.findByIdAndDelete(id)
  }
}