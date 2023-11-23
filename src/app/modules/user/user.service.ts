import { Tuser } from './user.interface';
import { mongodbuser } from './user.model';

const createuserIntoDB = async (userdata: Tuser) => {
  if (await mongodbuser.isUserExist(userdata.userId)) {
    throw new Error('User already exists!');
  }
  const result = await mongodbuser.create(userdata);
  return result;
};
export const userservice = {
  createuserIntoDB,
};
