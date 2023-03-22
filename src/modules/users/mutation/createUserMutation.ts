import { ZodError } from 'zod';
import { Args, OK, Parents, ResolverHandler } from '../../../types';
import { formatZodError } from '../../../utils/formatZodError';
import { hashPassword } from '../../../utils/hashPassword';
import { User } from '../userSchema';
import { UserService } from '../userServices';
export const createUserMutation: ResolverHandler<Promise<OK>> = async (
  _: Parents,
  args: Args<User>,
  { knex },
) => {
  const [user]: User[] = await knex
    .table('users')
    .where({ email: args.input.email });

  if (user) {
    throw new Error('User already created');
  }

  try {
    args.input.password = await hashPassword(args.input.password);
    await UserService.createUser(knex, args.input);
    return { ok: true };
  } catch (error: any) {
    if (error instanceof ZodError) {
      let message = formatZodError(error);
      throw new Error(message);
    }
    throw error;
  }
};
