import { PrismaClient, User } from '@prisma/client';
import { UserInput } from './userSchema';

export class UserService {
  static async createUser(
    prisma: PrismaClient,
    user: UserInput,
  ): Promise<User> {
    console.log(user);

    const newUser = await prisma.user.create({
      data: {
        ...user,
      } as any,
    });
    return newUser;
  }
}
