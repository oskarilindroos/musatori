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

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>({
    isLoggedIn: false,
    isAdmin: false,
    userId: "",
    userName: "",
    token: "",
  });

  const login = (user: AuthUser) => {
    setUser(user);

    localStorage.setItem("token", user.token);
  };

  const logout = () => {
    setUser({
      isLoggedIn: false,
      isAdmin: false,
      userId: "",
      userName: "",
      token: "",
    });

    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
