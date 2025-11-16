import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { UpdateUserSettingDto } from "src/userSettings/dto/UpdateUserSetting.dto"

export class UpdateUserDto {
  
  @IsOptional()
  @IsString()
  displayName?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserSettingDto)
  settings?: UpdateUserSettingDto;

}