import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class CreateUserDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Juan Carlos' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Macanudo' })
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@email.com' })
  email: string;
}

export class ResponseCreateUserDto extends CreateUserDto {}
