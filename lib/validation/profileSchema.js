import { z } from 'zod';

export const profileSchema = z.object({
  userImage: z.string().min(1, 'User image URL is required'),
  weight: z.number().positive('Weight must be a positive number').int('Weight must be an integer'),
  age: z.number().positive('Age must be a positive number').int('Age must be an integer'),
  gender: z.enum(['male', 'female', 'other'], 'Gender must be one of male, female, or other'),
  activityLevel: z.enum(['low', 'medium', 'high'], 'Activity level must be one of low, medium, or high'),
  climate: z.string().optional()
});