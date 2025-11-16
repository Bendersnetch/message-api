import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

// Custom Avatars List Schema
@Schema({ _id: false })
class AvatarEntry {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: mongoose.Schema.Types.ObjectId;

  @Prop({ type: String, required: true })
  avatarUrl: string;
}

const AvatarEntrySchema = SchemaFactory.createForClass(AvatarEntry);

@Schema()
export class UserSetting {
  
  @Prop()
  recieveNotifications: Boolean;

  @Prop({ type: [AvatarEntrySchema], default: [] })
  definedAvatars: AvatarEntry[];
}

export const UserSettingSchema = SchemaFactory.createForClass(UserSetting);