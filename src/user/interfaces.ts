import { Document, Types } from 'mongoose'

interface IUserKey  {
  phone: string
}

interface IRawUser extends IUserKey {
  name: string;
  lastName: string;
  contactList: IContact[]
}

export interface IContact extends IUserKey {
  contactName: string
}

export interface IContactModel extends IContact, Document {}

export interface IUser extends IRawUser, Document {
  _id: Types.ObjectId;
}
