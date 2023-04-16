import { Request, Response } from 'express';
import Knex from '../database';

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
  username: string | null;
  fullname: string | null;
  phoneNumber: string | null;
  profilePicture: string | null;
  token: string | null;
};

export type CorsOptions = {
  origin?: boolean | string | RegExp | (string | RegExp)[] | undefined;
  methods?: string | string[] | undefined;
  allowedHeaders?: string | string[] | undefined;
  exposedHeaders?: string | string[] | undefined;
  credentials?: boolean | undefined;
  maxAge?: number | undefined;
  preflightContinue?: boolean | undefined;
  optionsSuccessStatus?: number | undefined;
};

export interface Context {
  user: User | null;
  req: Request;
  res: Response;
  knex: typeof Knex;
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
