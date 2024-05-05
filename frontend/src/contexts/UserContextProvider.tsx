import { AuthUser } from "../types/users";
import { createContext, useState } from "react";
import { IUserContext } from "../types/users";

// The initial user object
const initialUser: AuthUser = {
  isLoggedIn: false,
  isAdmin: false,
  email: "",
  userId: "",
  userName: "",
  token: "",
};

export const UserContext = createContext<IUserContext>({
  user: initialUser,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

const getUserFromLocalStorage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return user;
};

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(getUserFromLocalStorage);

  const login = (user: AuthUser) => {
    setUser(user);

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(initialUser);

    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
