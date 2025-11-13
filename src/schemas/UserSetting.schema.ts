import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class UserSetting {
  
  @Prop()
  recieveNotifications: Boolean;
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);