export interface NewUserRequest {
  username: string;
  password: string;
  email: string;
}

export interface User {
  id: string;
  username: string;
  admin: number;
  created_at: string;
}

export interface LoginResponse {
  user: {
    id: string;
    username: string;
    email: string;
    admin: number;
  };
  token: string;
}

export interface AuthUser {
  isLoggedIn: boolean;
  isAdmin: boolean;
  email: string;
  userId: string;
  userName: string;
  token: string;
}

export interface IUserContext {
  user: AuthUser;
  setUser: Dispatch<SetStateAction<User>>;
  login: (user: AuthUser) => void;
  logout: () => void;
}
