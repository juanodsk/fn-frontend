import { createContext, useContext, useState, useEffect } from "react";
import {
  crearGrupoMinisterialRequest,
  obtenerGruposMinisterialesRequest,
  obtenerGrupoMinisterialPorIdRequest,
  actualizarGrupoMinisterialRequest,
  eliminarGrupoMinisterialRequest,
  asignarUsuarioAGrupoMinisterialRequest,
} from "../api/grupoMinisterial";

const GrupoMinisterialContext = createContext();

export const useGrupoMinisterial = () => {
  const context = useContext(GrupoMinisterialContext);
  if (!context) {
    throw new Error(
      "useGrupoMinisterial debe usarse dentro de un GrupoMinisterialProvider"
    );
  }
  return context;
};

export const GrupoMinisterialProvider = ({ children }) => {
  const [gruposMinisteriales, setGruposMinisteriales] = useState([]);
  const [grupoMinisterialSeleccionado, setGrupoMinisterialSeleccionado] =
    useState(null);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState([]);

  const obtenerGruposMinisteriales = async () => {
    try {
      setLoading(true);
      const res = await obtenerGruposMinisterialesRequest();
      setGruposMinisteriales(res.data.grupos);
    } catch (error) {
      console.error(error);
      setErrores([
        error.response?.data?.message ||
          "Error al obtener grupos ministeriales",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const crearGrupoMinisterial = async (datos) => {
    try {
      const res = await crearGrupoMinisterialRequest(datos);
      setGruposMinisteriales([...gruposMinisteriales, res.data.grupo]);
    } catch (error) {
      setErrores([
        error.response?.data?.message || "Error al crear grupo ministerial",
      ]);
    }
  };

  const actualizarGrupoMinisterial = async (id, datos) => {
    try {
      await actualizarGrupoMinisterialRequest(id, datos);
      setGruposMinisteriales(
        gruposMinisteriales.map((grupo) =>
          grupo._id === id ? { ...grupo, ...datos } : grupo
        )
      );
    } catch (error) {
      setErrores([
        error.response?.data?.message ||
          "Error al actualizar grupo ministerial",
      ]);
    }
  };

  const eliminarGrupoMinisterial = async (id) => {
    try {
      await eliminarGrupoMinisterialRequest(id);
      setGruposMinisteriales(
        gruposMinisteriales.filter((grupo) => grupo._id !== id)
      );
    } catch (error) {
      setErrores([
        error.response?.data?.message || "Error al eliminar grupo ministerial",
      ]);
    }
  };

  const obtenerGrupoMinisterialPorId = async (id) => {
    try {
      const res = await obtenerGrupoMinisterialPorIdRequest(id);
      setGrupoMinisterialSeleccionado(res.data.grupo);
    } catch (error) {
      setErrores([
        error.response?.data?.message || "Error al obtener grupo ministerial",
      ]);
    }
  };

  const asignarUsuarioAGrupoMinisterial = async (grupoId, usuarioId) => {
    try {
      await asignarUsuarioAGrupoMinisterialRequest(grupoId, usuarioId);
      await obtenerGruposMinisteriales(); // Refresca datos
    } catch (error) {
      setErrores([
        error.response?.data?.message ||
          "Error al asignar usuario al grupo ministerial",
      ]);
    }
  };

  useEffect(() => {
    if (errores.length > 0) {
      const timer = setTimeout(() => setErrores([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errores]);

  return (
    <GrupoMinisterialContext.Provider
      value={{
        gruposMinisteriales,
        grupoMinisterialSeleccionado,
        loading,
        errores,
        obtenerGruposMinisteriales,
        crearGrupoMinisterial,
        actualizarGrupoMinisterial,
        eliminarGrupoMinisterial,
        obtenerGrupoMinisterialPorId,
        asignarUsuarioAGrupoMinisterial,
      }}
    >
      {children}
    </GrupoMinisterialContext.Provider>
  );
};
export default GrupoMinisterialProvider;
