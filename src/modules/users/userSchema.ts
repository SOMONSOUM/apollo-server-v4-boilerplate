import * as z from 'zod';

export const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
  username: z.string(),
  fullname: z.string().optional(),
  phoneNumber: z.string().min(6).max(12),
  profilePicture: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;
