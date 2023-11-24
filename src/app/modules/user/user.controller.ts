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

const getordersofsingleuser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(typeof userId); // string
    const userIdNumber = Number(userId);
    const result = await userservice.getordersofUserFromDB(userIdNumber);

    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order fetched successfully!',
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body;
    console.log(req.params);
    const id = req.params.userId;
    console.log(id);
    const userIdNumber = Number(id);
    const result = await userservice.updateUserFromDB(userIdNumber, user);
    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'User updated successfully',
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const updateOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    console.log(req.params);
    const id = req.params.userId;
    console.log(id);
    const userIdNumber = Number(id);
    const result = await userservice.updateOrderInDB(userIdNumber, order);
    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'Order created successfully',
        data: null,
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const calculateprice = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const id = req.params.userId;
    console.log(id);
    const userIdNumber = Number(id);
    const user = await userservice.calculateTotalPrice(userIdNumber);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }

    if (!user.orders || user.orders.length === 0) {
      return res.json({
        success: true,
        message: 'No orders found for the user.',
        data: {
          totalPrice: 0,
        },
      });
    }

    const totalPrice = user.orders.reduce(
      (acc, order) => acc + order.price * order.quantity,
      0,
    );

    return res.json({
      success: true,
      message: 'Total price calculated successfully!',
      data: {
        totalPrice: totalPrice,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const id = req.params.userId;
    console.log(id);

    // Check if id is a valid number
    const userIdNumber = Number(id);

    const result = await userservice.deleteUser(userIdNumber);
    if (result) {
      res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
        data: null,
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: error.message || 'Something went wrong',
    });
  }
};

export const usercontrollers = {
  createUser,
  getAlluser,
  getsingleuser,
  updateUser,
  deleteUser,
  updateOrder,
  getordersofsingleuser,
  calculateprice,
};
