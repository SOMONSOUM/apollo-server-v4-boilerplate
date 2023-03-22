import { Request, Response } from 'express';
import { Knex } from 'knex';

export interface Parents {}

export interface Args<T = any, ID = any> {
  input: T;
  id: ID;
}

export type ID = number;

export type User = {
  id: number;
  email: string;
  password: string;
  name: string | null;
  phoneNumber: string | null;
  profilePicture: string | null;
};

export interface Context {
  user: User | null;
  req: Request;
  res: Response;
  knex: Knex;
}
export interface Info {}

export type ResolverHandler<ReturnType = any> = (
  parents: Parents,
  args: Args<any>,
  context: Context,
  info: Info,
) => ReturnType;

export interface OK {
  ok: boolean;
}
