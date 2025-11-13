import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateUserSettingDto {

  @IsNotEmpty()
  @IsBoolean()
  recieveNotifications: Boolean;

}