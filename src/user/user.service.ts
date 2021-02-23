import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { IUser, IContact } from './interfaces'
import { CreateUserDto, CreateContactListDto, CheckCommonContactsDto } from './dtos'
@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async getUser(searchParam: IUser['_id'] | IUser['phone']): Promise<IUser> {
    const parameter = (Types.ObjectId.isValid(searchParam)) ? {_id: String(searchParam)} : {phone: String(searchParam)}
    try {
      const user: IUser = await this.userModel.findOne(parameter)
      return user as IUser
    } catch (e) {
      throw new NotFoundException()
    }

  }
  async createUser(userData: CreateUserDto): Promise<IUser> {
    const { name, lastName, phone } = userData
    const user = {
      name,
      lastName,
      phone,
      contactList: []
    } as IUser

    try {
      const newUser = new this.userModel(user)
      await newUser.save()
      return newUser
    } catch(error) {
      throw new BadRequestException({status: 500, error})
    }

  }

  async storeContactList({contactList}: CreateContactListDto, userID: IUser['_id']): Promise<IUser> {

    try {
      return await this.userModel.findByIdAndUpdate(userID, {contactList},{useFindAndModify: false})
    } catch(error) {
      throw new BadRequestException({status: 500, error})
    }
  }

  async showContactLIst(userID: IUser['_id']): Promise<IContact[]> {
    const user = await this.getUser(userID)
    const contactList = [...user.contactList]
    return contactList
  }

  async checkCommonContacts(checkCommonContacts: CheckCommonContactsDto[]): Promise<IUser[]> {
    let contactListArr = []
    checkCommonContacts.forEach(async ({userID}) => {
      const contactList = await this.showContactLIst(Types.ObjectId(userID))
      contactListArr = [...contactListArr, contactList]
    })
    const contactListIntersection = contactListArr[0].filter((x:IContact) => contactListArr[1].includes(x)).map(({phone}) => phone)
    try {
      const users = await this.userModel.aggregate([{ $match: { _id: { $in: contactListIntersection } } }])
      return users
    } catch(error)  {
      throw new BadRequestException({status: 500, error})
    }
  }
}
