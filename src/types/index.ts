import { Request } from 'express';

export type AuthUser = {
  id: number;
  username: string;
};

export interface IExpressRequest extends Request {
  user?: AuthUser;
}
