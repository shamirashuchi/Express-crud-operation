import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';
import {
  Taddress,
  TfullName,
  Torders,
  Tuser,
  UserModel,
} from './user.interface';
import config from '../../config';

const fullNameSchema = new Schema<TfullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    maxlength: [20, 'First name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in a capitalize format',
    },
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const addressSchema = new Schema<Taddress>({
  street: {
    type: String,
    trim: true,
    required: [true, 'Street is required.'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City is required.'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country is required.'],
  },
});

const ordersSchema = new Schema<Torders>({
  productName: {
    type: String,
    trim: true,
    required: [true, 'Product name is required.'],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, 'Price is required.'],
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, 'Quantity is required.'],
  },
});

const userSchema = new Schema<Tuser, UserModel>({
  userId: {
    type: Number,
    trim: true,
    required: [true, 'UserId is required.'],
    unique: true,
  },

  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required.'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    maxlength: [20, 'Password can not be more than 20 characters'],
  },
  fullName: {
    type: fullNameSchema,
    trim: true,
    required: [true, 'fullname is required.'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required.'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email type',
    },
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: {
    type: [String],
    required: [true, 'Hobbies are required.'],
  },
  address: {
    type: addressSchema,
    trim: true,
    required: [true, 'address is required.'],
  },
  orders: {
    type: [ordersSchema],
    trim: true,
    required: false,
  },
});

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook : we will save the data');
  //hashing password and save into db
  const user = this; //this is the data i send from postman
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  console.log('post hook : we saved the data');
  next();
});

userSchema.statics.isUserExist = async function (userId: number) {
  const existingUser = await mongodbuser.findOne({ userId });
  return existingUser;
};
export const mongodbuser = model<Tuser, UserModel>('user', userSchema);
