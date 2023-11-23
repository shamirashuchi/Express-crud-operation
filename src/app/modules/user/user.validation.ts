import { z } from 'zod';
import validator from 'validator';
const userFullNameZodSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name can not be more than 20 characters' })
    .refine(
      (value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      { message: 'First name is not in capitalize format' },
    ),

  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .refine((value) => validator.isAlpha(value), {
      message: 'Last name is not valid',
    }),
});

const addressZodSchema = z.object({
  street: z.string().min(1, { message: 'Street is required.' }),
  city: z.string().min(1, { message: 'City is required.' }),
  country: z.string().min(1, { message: 'Country is required.' }),
});

const ordersZodSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required.' }),
  price: z.number().refine((data) => data >= 0, {
    message: 'Price must be a non-negative number.',
  }),
  quantity: z.number().refine((data) => data >= 0, {
    message: 'Quantity must be a non-negative number.',
  }),
});

export const userZodSchema = z.object({
  userId: z.number().refine((data) => data >= 0, {
    message: 'User ID must be a non-negative number.',
  }),
  username: z
    .string()
    .min(5, { message: 'Username must be at least 5 characters long.' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' }),
  fullName: userFullNameZodSchema,
  age: z.number().refine((data) => data >= 0, {
    message: 'Age must be a non-negative number.',
  }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email address.' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()).refine((data) => data.length > 0, {
    message: 'At least one hobby is required.',
  }),
  address: addressZodSchema,
  orders: z.array(ordersZodSchema),
});
