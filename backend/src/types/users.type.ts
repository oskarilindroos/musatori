export interface NewUser {
  id: string;
  username: string;
  password: string;
}

export interface UpdatedUser {
  username: string;
  password: string;
  admin: boolean;
}
