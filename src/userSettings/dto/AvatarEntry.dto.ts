import { IsMongoId, IsUrl } from "class-validator";

export class AvatarEntryDto {
  @IsMongoId()
  user: string;

  @IsUrl()
  avatarUrl: string;
}