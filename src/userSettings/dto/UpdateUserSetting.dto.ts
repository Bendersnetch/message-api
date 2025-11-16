import { IsBoolean, IsMongoId, IsNotEmpty, IsOptional, ValidateNested } from "class-validator";
import mongoose from "mongoose";
import { AvatarEntryDto } from "./AvatarEntry.dto";
import { Type } from "class-transformer";

export class UpdateUserSettingDto {

  @IsNotEmpty()
  @IsMongoId()
  _id: mongoose.Schema.Types.ObjectId;
  
  @IsOptional()
  @IsBoolean()
  recieveNotifications?: Boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AvatarEntryDto)
  definedAvatars?: AvatarEntryDto[];
}