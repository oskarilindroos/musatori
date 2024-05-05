import { AuthUser } from "../types/users";
import { createContext, useState } from "react";
import { IUserContext } from "../types/users";

export const UserContext = createContext<IUserContext>({
  user: {
    isLoggedIn: false,
    isAdmin: false,
    userId: "",
    userName: "",
    token: "",
  },
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

const initialUser: AuthUser = {
  isLoggedIn: false,
  isAdmin: false,
  userId: "",
  userName: "",
  token: "",
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const login = (user: AuthUser) => {
    setUser(user);

    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setUser(initialUser);

    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
