import { PrismaClient, User } from '@prisma/client';
import { Request, Response } from 'express';

export interface Parents {}

export interface Args<T = any, ID = any> {
  input: T;
  id: ID;
}

export type ID = number;
export interface Context {
  user: User | null;
  req: Request;
  res: Response;
  prisma: PrismaClient;
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
