import { GqlUser, GqlUserInput } from '../../../generated/graphql';
import { ResolverHandler, OK, Parents, Args } from '../../../types';
import { ZodError } from 'zod';
import { UserType, validateUserInput } from '../userSchema';
import { hashPassword } from '../../../utils/hashPassword';
import { UserService } from '../userServices';
import { formatZodError } from '../../../utils/formatZodError';

export const createUserMutation: ResolverHandler<Promise<OK>> = async (
  _: Parents,
  args: Args<GqlUserInput>,
  { knex },
) => {
  try {
    const validatedUserInput: UserType = validateUserInput(args.input);
    const [existingUser]: GqlUser[] = await knex
      .table('users')
      .where({ email: validatedUserInput.email });

    if (existingUser) {
      throw new Error('A user with the same email already exists');
    }
    const hashedPassword = await hashPassword(validatedUserInput.password);

    await UserService.createUser(knex, {
      ...validatedUserInput,
      password: hashedPassword,
    });
    return { ok: true };
  } catch (error: any) {
    if (error instanceof ZodError) {
      const errorMessage = formatZodError(error);
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
};
