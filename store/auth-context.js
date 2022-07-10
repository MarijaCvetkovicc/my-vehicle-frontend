import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  authenticate: (user) => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  function authenticate(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
  }

  const value = {
    user: user,
    isAuthenticated: !!user,
    authenticate: authenticate,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
