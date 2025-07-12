import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");
    const storedHistory = localStorage.getItem("purchaseHistory");
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }
    if (storedHistory) {
      setPurchaseHistory(JSON.parse(storedHistory));
    }
  }, []);

  const login = (userData) => {
    const token = "fake-token";
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("purchaseHistory");
    setUser(null);
    setPurchaseHistory([]);
  };

  const addPurchase = (purchase) => {
    const updatedHistory = [...purchaseHistory, purchase];
    setPurchaseHistory(updatedHistory);
    localStorage.setItem("purchaseHistory", JSON.stringify(updatedHistory));
  };

  
  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, purchaseHistory, addPurchase, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
