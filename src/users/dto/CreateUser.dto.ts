import { Type } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"
import { CreateUserSettingDto } from "src/userSettings/dto/CreateUserSetting.dto"

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateUserSettingDto)
  settings?: CreateUserSettingDto;
}