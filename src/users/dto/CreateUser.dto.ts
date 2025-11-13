import { IsBoolean, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator"

export class CreateUserSettingDto {

  @IsOptional()
  @IsBoolean()
  recieveNotifications: Boolean;

}

export class CreateUserDto {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  displayName?: string;

  @IsNotEmpty()
  @ValidateNested()
  settings?: CreateUserSettingDto;
}