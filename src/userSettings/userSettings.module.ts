import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSetting, UserSettingSchema } from "src/schemas/UserSetting.schema";
import { UsersSettingsService } from "./userSettings.service";
import { UsersSettingsController } from "./userSettings.controller";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: UserSetting.name,
      schema: UserSettingSchema
    }])
  ],
  providers: [
    UsersSettingsService
  ],
  controllers: [
    UsersSettingsController
  ]
})
export class UserSettingModule {

}