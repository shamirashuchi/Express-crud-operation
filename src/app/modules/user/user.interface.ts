import { Model } from 'mongoose';

export type Tuser = {
  userId: number;
  username: string;
  password: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: {
    street: string;
    city: string;
    country: string;
  };
};

export interface UserModel extends Model<Tuser> {
  isUserExist(id: string): Promise<Tuser | null>;
}
