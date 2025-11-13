import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/User.schema";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserSetting, UserSettingSchema } from "src/schemas/UserSetting.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    },
    {
      name: UserSetting.name,
      schema: UserSettingSchema
    }])
  ],
  providers: [
    UsersService
  ],
  controllers: [
    UsersController
  ]
})
export class UsersModule {

}