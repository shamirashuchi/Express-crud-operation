import { Tuser } from './user.interface';
import { mongodbuser } from './user.model';

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
      _id: 0, // Exclude the _id field
    },
  );
  return result;
};
export const userservice = {
  createuserIntoDB,
  getAllUserFromDB,
};
