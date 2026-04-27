import { IsBoolean, IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';
import { ADMIN_USER_ROLES } from './create-admin-user.dto';

export class UpdateAdminUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsIn(ADMIN_USER_ROLES)
  role?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
