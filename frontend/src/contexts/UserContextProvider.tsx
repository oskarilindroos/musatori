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

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(initialUser);

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
