import { IsBoolean, IsOptional, ValidateNested } from "class-validator"
import { AvatarEntryDto } from "./AvatarEntry.dto";
import { Type } from "class-transformer";

export class CreateUserSettingDto {

  @IsOptional()
  @IsBoolean()
  recieveNotifications: Boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AvatarEntryDto)
  definedAvatars?: AvatarEntryDto[];

}