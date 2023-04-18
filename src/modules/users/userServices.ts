import { Knex } from 'knex';
import { GqlUser, GqlUserInput } from '~/generated/graphql';

export class UserService {
  static async createUser(
    knex: Knex,
    user: GqlUserInput,
  ): Promise<GqlUserInput> {
    const newUser: GqlUserInput = await knex.table('users').insert({
      email: user.email,
      password: user.password,
      username: user.username,
      fullname: user.fullname,
      phone_number: user.phoneNumber,
      profile_picture: user.profilePicture,
    });
    return newUser;
  }

  static async getAllUser(knex: Knex): Promise<GqlUser> {
    const users: GqlUser = await knex.table('users');
    return users;
  }
}
