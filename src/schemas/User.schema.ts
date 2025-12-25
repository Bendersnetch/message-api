import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { UserSetting } from "./UserSetting.schema";

@Schema()
export class User {
  
  @Prop({ unique: true })
  username: string;

  @Prop({required: false})
  displayName?: string;

  @Prop({required: false})
  avatarUrl?: string;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'UserSetting', required: true})
  settings?: UserSetting
}

export const UserSchema = SchemaFactory.createForClass(User);