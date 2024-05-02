import { AuthenticatedUser } from "../users.type.ts";
declare global {
  namespace Express {
    export interface Request {
      user: AuthenticatedUser;
    }
  }
}
