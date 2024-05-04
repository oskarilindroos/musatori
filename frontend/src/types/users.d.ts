export interface NewUserRequest {
  username: string;
  password: string;
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
    admin: number;
  };
  token: string;
}

export interface AuthUser {
  isLoggedIn: boolean;
  isAdmin: boolean;
  userId: string;
  userName: string;
  token: string;
}

export interface IUserContext {
  user: UserContext;
  setUser: Dispatch<SetStateAction<User>>;
  login: (user: AuthUser) => void;
  logout: () => void;
}
