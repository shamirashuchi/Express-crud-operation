import { Tuser } from './user.interface';
import { mongodbuser } from './user.model';
import mongoose from 'mongoose';

const createuserIntoDB = async (userdata: Tuser) => {
  if (await mongodbuser.isUserExist(userdata.userId)) {
    throw new Error('User already exists!');
  }
  const result = await mongodbuser.create(userdata);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await mongodbuser.find(
    {},
    {
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
      _id: 0,
    },
  );
  return result;
};

const getsingleUserFromDB = async (userId: number) => {
  console.log(userId);
  const result = await mongodbuser.findOne({ userId }).select({
    userId: 1,
    username: 1,
    fullName: 1,
    age: 1,
    email: 1,
    isActive: 1,
    hobbies: 1,
    address: 1,
    _id: 0,
  });
  return result;
};
export const userservice = {
  createuserIntoDB,
  getAllUserFromDB,
  getsingleUserFromDB,
};
