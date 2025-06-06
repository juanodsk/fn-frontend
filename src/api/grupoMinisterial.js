import axios from "../api/axios.js";

// Crear un nuevo grupo ministerial
export const crearGrupoMinisterialRequest = (grupoMinisterial) =>
  axios.post("/grupo-ministerial", grupoMinisterial, { withCredentials: true });

// Obtener todos los grupos ministeriales
export const obtenerGruposMinisterialesRequest = () =>
  axios.get("/grupo-ministerial", { withCredentials: true });

// Obtener un grupo ministerial por ID
export const obtenerGrupoMinisterialPorIdRequest = (id) =>
  axios.get(`/grupo-ministerial/${id}`, { withCredentials: true });

// Actualizar un grupo ministerial por ID
export const actualizarGrupoMinisterialRequest = (id, datosActualizados) =>
  axios.put(`/grupo-ministerial/${id}`, datosActualizados, {
    withCredentials: true,
  });

// Eliminar un grupo ministerial por ID
export const eliminarGrupoMinisterialRequest = (id) =>
  axios.delete(`/grupo-ministerial/${id}`, { withCredentials: true });

// Asignar un usuario a un grupo ministerial
export const asignarUsuarioAGrupoMinisterialRequest = (
  grupoMinisterialId,
  usuarioId
) =>
  axios.post(
    `/grupo-ministerial/${grupoMinisterialId}/asignar/${usuarioId}`,
    null,
    {
      withCredentials: true,
    }
  );
