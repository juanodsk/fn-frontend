import { useAuth } from "../../context/AuthContext";
import Menu from "../../components/Menu";
import { useState, useEffect } from "react";
import {
  CalendarIcon,
  PhoneIcon,
  MapPinIcon,
  MailIcon,
  UsersIcon,
  PencilIcon,
  XIcon,
} from "lucide-react";

function UserProfile() {
  const { usuario, updateProfile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    nombres: usuario?.nombres || "",
    apellidos: usuario?.apellidos || "",
    email: usuario?.email || "",
    telefono: usuario?.telefono || "",
    cedula: usuario?.cedula || "",
    fechaNacimiento: usuario?.fechaNacimiento || "",
    direccion: usuario?.direccion || "",
    notas: usuario?.notas || "",
    rol: usuario?.rol || "",
    estado: usuario?.estado || "",
    fechaRegistro: usuario?.fechaRegistro || "",
    grupoMinisterialIds: usuario?.grupoMinisterialIds || [],
    actividadesEspirituales: usuario?.actividadesEspirituales || [],
  });

  // Sincroniza formData cuando usuario cambie
  useEffect(() => {
    setFormData({
      nombres: usuario?.nombres || "",
      apellidos: usuario?.apellidos || "",
      email: usuario?.email || "",
      telefono: usuario?.telefono || "",
      cedula: usuario?.cedula || "",
      fechaNacimiento: usuario?.fechaNacimiento || "",
      direccion: usuario?.direccion || "",
      notas: usuario?.notas || "",
      estado: usuario?.estado || "",
      fechaRegistro: usuario?.fechaRegistro || "",
      grupoMinisterialIds: usuario?.grupoMinisterialIds || [],
      actividadesEspirituales: usuario?.actividadesEspirituales || [],
    });
  }, [usuario]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // Si es un campo de fecha, ajusta a zona local
    if (type === "date") {
      // value es "YYYY-MM-DD"
      const [year, month, day] = value.split("-");
      const localDate = new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        12
      ); // 12h para evitar desfase por zona
      setFormData({ ...formData, [name]: localDate.toISOString() });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("➡️ Enviando datos al backend:", formData);

      const {
        nombres,
        apellidos,
        telefono,
        direccion,
        notas,
        fechaNacimiento,
        grupoMinisterialIds,
        actividadesEspirituales,
        estado,
        fotoPerfil,
      } = formData;

      const response = await updateProfile({
        nombres,
        apellidos,
        telefono,
        direccion,
        notas,
        fechaNacimiento,
        grupoMinisterialIds,
        actividadesEspirituales,
        estado,
        fotoPerfil,
      });

      if (response && response.data) {
        setFormData({
          ...formData,
          ...response.data,
        });
      }
      setIsOpen(false);
    } catch (error) {
      console.error("❌ Error al actualizar el perfil:", error);
      if (error.response) {
        console.error("🧾 Error de respuesta:", error.response.data);
      }
    }
  };

  return (
    <div className="flex">
      <aside>
        <Menu />
      </aside>

      <main className="flex-1 p-4 pt-20 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-2xl p-6">
          <div className="flex items-center justify-between border-b pb-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Perfil de Usuario
              </h1>
              <p className="text-sm text-gray-500">ID: {usuario?.id}</p>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-4 mb-6">
            <Info label="Nombres" value={usuario?.nombres} />
            <Info label="Apellidos" value={usuario?.apellidos} />
            <Info
              label="Correo"
              value={usuario?.email}
              icon={<MailIcon className="w-4 h-4 mr-1" />}
            />
            <Info
              label="Teléfono"
              value={
                usuario?.telefono ? (
                  <a
                    href={`https://wa.me/+57${usuario.telefono}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {usuario.telefono}
                  </a>
                ) : (
                  "No disponible"
                )
              }
              icon={<PhoneIcon className="w-4 h-4 mr-1" />}
            />
            <Info label="Cédula" value={usuario?.cedula} />
            <Info
              label="Fecha de nacimiento"
              value={formatDate(usuario?.fechaNacimiento)}
            />
            <Info
              label="Dirección"
              value={usuario?.direccion}
              icon={<MapPinIcon className="w-4 h-4 mr-1" />}
            />
            <Info label="Notas" value={usuario?.notas} />
          </section>

          <section className=" border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Ministerio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Info label="Rol" value={usuario?.rol} />
              <Info
                label="Estado"
                value={
                  <span
                    className={`px-2 py-1 rounded text-white text-xs font-semibold ${
                      usuario?.estado === "activo"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {usuario?.estado === "activo" ? "Activo" : "Inactivo"}
                  </span>
                }
              />{" "}
              <Info
                label="Fecha de Registro"
                value={formatDate(usuario?.fechaRegistro)}
              />
              <Info
                label="Grupo Ministerial"
                value={
                  usuario?.grupoMinisterialIds
                    ?.map((g) => g.nombre)
                    .join(", ") || "Sin grupo asignado"
                }
                icon={<UsersIcon className="w-4 h-4 mr-1" />}
              />
            </div>
          </section>

          {/* Apartado Información de Líder */}
          <section className=" border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Información de Líder
            </h2>
            {usuario?.pastor ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info
                  label="Nombre del Pastor"
                  value={
                    usuario.pastor && usuario.pastor.nombres
                      ? `${usuario.pastor.nombres} ${usuario.pastor.apellidos}`
                      : "No disponible"
                  }
                />
              </div>
            ) : (
              <p className="text-gray-500">
                No hay información de líder asignada.
              </p>
            )}
          </section>
          <section className=" border-b pb-4 mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Información de Celula
            </h2>
            {usuario?.grupo ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Info
                  label="Nombre del lider de celula"
                  value={
                    usuario.grupo &&
                    usuario.grupo.lider &&
                    usuario.grupo.lider.nombres
                      ? `${usuario.grupo.lider.nombres} ${usuario.grupo.lider.apellidos}`
                      : "No disponible"
                  }
                />
                <Info
                  label="Direccion de la Celula"
                  value={
                    usuario.grupo && usuario.grupo.direccion
                      ? usuario.grupo.direccion
                      : "No disponible"
                  }
                />
                <Info
                  label="Ubicación de la Celula"
                  value={
                    usuario.grupo && usuario.grupo.direccion
                      ? usuario.grupo.direccion
                      : "No disponible"
                  }
                />
              </div>
            ) : (
              <p className="text-gray-500">
                No hay información de celula asignada.
              </p>
            )}
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Actividad Espiritual
            </h2>
            {usuario?.actividadesEspirituales?.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {usuario.actividadesEspirituales.map((actividad, idx) => (
                  <li key={idx}>{actividad}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay actividades registradas.</p>
            )}
          </section>

          <div className="flex flex-wrap gap-4 mt-6">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="text-white bg-yellow-700 hover:bg-yellow-800 transition focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              <PencilIcon className="inline w-4 h-4 mr-1" /> Editar Perfil
            </button>
          </div>
        </div>

        {/* Modal */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
            <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-2xl relative">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Editar Perfil</h2>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {Object.keys(formData).map((key) => {
                  if (
                    key === "grupoMinisterialIds" ||
                    key === "actividadesEspirituales" ||
                    key === "rol" ||
                    key === "estado" ||
                    key === "fechaRegistro" ||
                    key === "notas"
                  ) {
                    return null;
                  }

                  const isDateField =
                    key === "fechaNacimiento" || key === "fechaRegistro";

                  return (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-600 capitalize">
                        {key}
                      </label>

                      {isDateField ? (
                        <div className="relative">
                          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <CalendarIcon className="w-4 h-4 text-gray-500" />
                          </div>
                          <input
                            type="date"
                            name={key}
                            value={formData[key]?.split("T")[0] || ""}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                            focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                          />
                        </div>
                      ) : (
                        <input
                          type="text"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                      )}
                    </div>
                  );
                })}

                <div className="col-span-2 flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="bg-yellow-600 transition  hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Info({ label, value, icon }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className="text-yellow-800 flex items-center">
        {icon}
        {value || "No disponible"}
      </p>
    </div>
  );
}

function formatDate(date) {
  if (!date) return "";
  // Siempre toma la fecha en local
  const d = new Date(date);
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default UserProfile;
