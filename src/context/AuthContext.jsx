import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
  updateProfileRequest,
  perfilRequest,
  logoutRequest, // <-- importar logoutRequest
} from "../api/auth.js";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (usuario) => {
    try {
      const res = await registerRequest(usuario);
      setUsuario(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (usuario) => {
    try {
      const res = await loginRequest(usuario);
      setUsuario(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data, message);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const cookies = Cookies.get();

      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUsuario(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);
  const getPerfil = async () => {
    try {
      const res = await perfilRequest();
      setUsuario(res.data);
      return res.data;
    } catch (error) {
      setErrors(error.response?.data || ["Error al obtener perfil"]);
      throw error;
    }
  };
  const updateProfile = async (datosActualizados) => {
    try {
      const res = await updateProfileRequest(datosActualizados);
      await getPerfil();

      return res; // <-- Retorna la respuesta
    } catch (error) {
      setErrors(error.response?.data || ["Error al actualizar el perfil"]);
      throw error; // <-- Lanza el error para que el componente lo pueda capturar si lo necesita
    }
  };
  const logout = async () => {
    try {
      await logoutRequest();
      setUsuario(null);
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      setErrors(error.response?.data || ["Error al cerrar sesión"]);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        usuario,
        isAuthenticated,
        errors,
        loading,
        updateProfile,
        getPerfil,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
