// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { getProfile } from "@/lib/api/profile/profile";
import { getToken, removeToken, setToken } from "@/utils/helpers";
import { notifyError } from "@/utils/toast";
import { useRouter } from "next/router";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      setUser(res.data?.data);
    } catch (err) {
      notifyError(err);
      removeToken();
      setUser({});
    } finally {
      setLoading(false);
    }
  };

  const login = async (token) => {
    setToken(token);
    try {
      const res = await getProfile();
      setUser(res?.data?.data);
    } catch {
      setUser({});
      removeToken();
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
    router?.push("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, fetchProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
