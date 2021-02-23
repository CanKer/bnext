import { IsNotEmpty, ArrayNotEmpty, ArrayMaxSize } from 'class-validator'
import { IContact} from '../interfaces'
export class CreateContactListDto  {
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ArrayMaxSize(2)
  contactList: IContact[]
}
