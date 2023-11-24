import { Torders, Tuser } from './user.interface';
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

const getordersofUserFromDB = async (userId: number) => {
  console.log(userId);
  const result = await mongodbuser.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  });
  return result;
};

const updateUserFromDB = async (
  userId: number,
  userData: Tuser,
): Promise<Tuser | null> => {
  const result = await mongodbuser.updateOne({ userId }, { $set: userData });
  if (result.modifiedCount && result.modifiedCount > 0) {
    const updatedUser = await mongodbuser.findOne({ userId });
    return updatedUser;
  } else {
    return null;
  }
};

const updateOrderInDB = async (
  userId: number,
  updatedOrderData: Torders,
): Promise<Tuser | null> => {
  const filter = { userId };
  const update = {
    $push: {
      orders: updatedOrderData,
    },
  };
  const result = await mongodbuser.updateOne(filter, update);

  if (result.modifiedCount && result.modifiedCount > 0) {
    const updatedUser = await mongodbuser.findOne({ userId });
    return updatedUser;
  } else {
    return null;
  }
};

const deleteUser = async (userId: number): Promise<Tuser | null> => {
  const result = await mongodbuser.deleteOne({ userId });
  return result.deletedCount === 1 ? result : null;
};

const calculateTotalPrice = async (userId: number): Promise<number> => {
  const user = await mongodbuser.findOne({ userId }).select({
    orders: 1,
    _id: 0,
  });
  return user;
};

export const userservice = {
  createuserIntoDB,
  getAllUserFromDB,
  getsingleUserFromDB,
  updateUserFromDB,
  deleteUser,
  updateOrderInDB,
  getordersofUserFromDB,
  calculateTotalPrice,
};
