import { useEffect } from "react";
import Logo from "../../assets/logo.png";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/login");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });
  return (
    <section className="bg-yellow-300 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg-py-0">
        <div className="w-full bg-white rounded-lg shadow-lg shadow-gray-500 md:mt-0 sm:max-w-md xl:p-0  ">
          <a href="/" className="flex items-center mb-1">
            <img src={Logo} alt="Logo" />
          </a>
          {registerErrors.map((error, i) => (
            <div className="bg-amber-700 mt-1 p-2 mx-5 text-white" key={i}>
              {error}
            </div>
          ))}
          <div className="py-3 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Registrar Usuario
            </h1>
            <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="nombres"
                  className="block mb-2 text-sm  text-gray-900 font-semibold"
                >
                  Nombres
                </label>

                <input
                  type="text"
                  {...register("nombres", { required: true })}
                  placeholder="Nombres"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.nombres && (
                  <p className="text-red-700">Nombre es requerido</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nombres"
                  className="block mb-2 text-sm  text-gray-900 font-semibold"
                >
                  Apellidos
                </label>
                <input
                  type="text"
                  {...register("apellidos", { required: true })}
                  placeholder="Apellidos"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.apellidos && (
                  <p className="text-red-700">Apellidos es requerido</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="cedula"
                  className="block mb-2 text-sm  text-gray-900 font-semibold"
                >
                  Cédula
                </label>
                <input
                  type="text"
                  {...register("cedula", { required: true })}
                  placeholder="Cedula"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.cedula && (
                  <p className="text-red-700">Cédula es requerido</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nombres"
                  className="block mb-2 text-sm  text-gray-900 font-semibold"
                >
                  Correo Electronico
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="Correo Electronico"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.email && (
                  <p className="text-red-700">
                    Correo Electrónico es requerido
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="nombres"
                  className="block mb-2 text-sm  text-gray-900 font-semibold"
                >
                  Telefono
                </label>
                <input
                  type="number"
                  {...register("telefono", { required: true })}
                  placeholder="Telefono"
                  className="bg-gray-300 border  border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none "
                />
                {errors.telefono && (
                  <p className="text-red-700">Teléfono es requerido</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-semibold text-gray-900"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="Contraseña"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.password && (
                  <p className="text-red-700">Contraseña es requerida</p>
                )}
              </div>
              <div className="flex items-center justify-between"></div>
              <button
                type="submit"
                className="w-full cursor-pointer text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200 ease-in-out hover:shadow-lg active:scale-95"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
