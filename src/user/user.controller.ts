import { Controller, Body, Param, Post, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, CreateContactListDto, CheckCommonContactsDto} from './dtos'
import { IUser } from './interfaces'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto)  {
    return this.userService.createUser(createUserDto)
  }
  @Post(':id/contactList')
  storeContactList(@Body() createContactListDto: CreateContactListDto, @Param('id') userID: IUser['_id'])  {
    return this.userService.storeContactList(createContactListDto, userID)
  }
  @Get(':id/contactList')
  showContactLIst(@Param('id') userID: IUser['_id']) {
    return this.userService.showContactLIst(userID)
  }
  @Get()
  checkCommonContacts(@Body() checkCommonContactsDto: CheckCommonContactsDto[]) {
    return this.userService.checkCommonContacts(checkCommonContactsDto)
  }
}
