import { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); 

  const login = (userName) => {
    const token = "fake-token"; 
    localStorage.setItem("authToken", token);
    setUser(userName);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };
//console.log("AuthProvider se ha montado");
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}


export const useAuthContext = () => useContext(AuthContext);
