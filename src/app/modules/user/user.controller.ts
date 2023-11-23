import { Request, Response } from 'express';
import { userZodSchema } from './user.validation';
import { userservice } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const { user: userdata } = req.body;
    const zodparsedata = userZodSchema.parse(userdata);
    const result = await userservice.createuserIntoDB(zodparsedata);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err.errors,
    });
  }
};
export const usercontrollers = {
  createUser,
};
