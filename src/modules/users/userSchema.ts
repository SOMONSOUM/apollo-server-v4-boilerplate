import * as z from 'zod';
import { GqlUserInput } from '~/generated/graphql';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  username: z.string(),
  fullname: z.string().optional(),
  phoneNumber: z.string().min(6).max(12),
  profilePicture: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;
export const validateUserInput = (userInput: GqlUserInput): UserType =>
  UserSchema.parse(userInput);
