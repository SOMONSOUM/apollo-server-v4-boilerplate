import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
import { Args, OK, Parents, ResolverHandler } from '../../../types';
import { formatZodError } from '../../../utils/formatZodError';
import { hashPassword } from '../../../utils/hashPassword';
import { UserInput, UserSchema } from '../userSchema';
import { UserService } from '../userServices';

export const createUserMutation: ResolverHandler<Promise<OK>> = async (
  _: Parents,
  args: Args<UserInput>,
  { prisma },
) => {
  try {
    await UserSchema.parseAsync(args.input);
    args.input.password = await hashPassword(args.input.password);
    // console.log(args.input);
    await UserService.createUser(prisma, args.input);
    return { ok: true };
  } catch (error: any) {
    if (error instanceof PrismaClientValidationError) {
      throw new Error(error as any);
    }
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('User already exists');
      }
    }
    if (error instanceof ZodError) {
      let message = formatZodError(error);
      throw new Error(message);
    }
    throw error;
  }
};
