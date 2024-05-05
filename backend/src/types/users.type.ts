export interface NewUser {
  id: string;
  email: string;
  username: string;
  password: string;
}

export interface UpdatedUser {
  username: string;
  password: string;
  admin: number;
}

export interface JwtUser {
  id: string;
  email: string;
  username: string;
  admin: number;
}

export interface AuthenticatedUser extends JwtUser {
  iat: number;
  exp: number;
}
