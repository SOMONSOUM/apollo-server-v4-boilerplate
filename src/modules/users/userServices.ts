import { User } from './userSchema';
import { Knex } from 'knex';

export class UserService {
  static async createUser(knex: Knex, user: User): Promise<User> {
    const newUser = (await knex.table('users').insert({
      email: user.email,
      password: user.password,
      username: user.username,
      fullname: user.fullname,
      phone_number: user.phoneNumber,
      profile_picture: user.profilePicture,
    })) as User;
    return newUser;
  }
}
