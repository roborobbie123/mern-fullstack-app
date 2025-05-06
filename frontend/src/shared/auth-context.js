import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: true,
  token: null,
  userId: null,
  login: () => {},
  logout: () => {},
});


