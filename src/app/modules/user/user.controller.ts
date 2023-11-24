import { Request, Response } from 'express';
import { userZodSchema } from './user.validation';
import { userservice } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    //console.log('Received data:', req.body);
    const { user: userdata } = req.body;
    //console.log(userdata);
    const zodparsedata = userZodSchema.parse(userdata);
    // console.log(zodparsedata);
    const result = await userservice.createuserIntoDB(zodparsedata);
    //console.log(result);
    res.status(200).json({
      success: true,
      message: 'user is created successfully',
      data: {
        ...result.toObject(),
        password: undefined,
      },
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err.errors,
    });
  }
};

const getAlluser = async (req: Request, res: Response) => {
  try {
    const result = await userservice.getAllUserFromDB();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something go wrong',
      error: err,
    });
  }
};

const getsingleuser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(typeof userId); // string
    const userIdNumber = Number(userId);
    const result = await userservice.getsingleUserFromDB(userIdNumber);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (err: any) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: err,
    });
  }
};

export const usercontrollers = {
  createUser,
  getAlluser,
  getsingleuser,
};
