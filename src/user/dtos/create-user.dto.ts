import { IsNotEmpty } from 'class-validator'

export class CreateUserDto  {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  phone: string
}
