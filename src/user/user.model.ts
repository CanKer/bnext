import { Schema } from "mongoose"
import { IUser, IContactModel } from './interfaces'


const ContactSchema = new Schema<IContactModel>({
  contactName: {   type: String,
            required: [true, "contactName required"],
            trim: true,
            },
  phone: {  type: String,
                  required: [true, "phone required"],
                  unique: true,
                  trim: true,
                  index: true
            },
}, {_id: false})

const UserSchema = new Schema<IUser>({
  name: {   type: String,
            required: [true, "name required"],
            trim: true,
            },
  lastName: {   type: String,
                trim: true,
            },
  phone: {  type: String,
                  required: [true, "phone required"],
                  unique: true,
                  trim: true,
                  index: true
            },
  contactList: {type: [ContactSchema]}
})

export default UserSchema
