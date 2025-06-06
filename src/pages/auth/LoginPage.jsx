import React, { use } from "react";
import Logo from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";
import { data, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { isAuthenticated, signin, errors: loginErrors } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) navigate("/dashboard");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });
  return (
    <section className="bg-yellow-300 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg-py-0">
        <div className="w-full bg-white rounded-lg shadow-lg shadow-gray-500 md:mt-0 sm:max-w-md xl:p-0  ">
          <a href="/" className="flex items-center mb-1">
            <img src={Logo} alt="Logo" />
          </a>
          {loginErrors.map((error, i) => (
            <div className="bg-amber-700 mt-1 p-2 mx-5 text-white" key={i}>
              {error}
            </div>
          ))}
          <div className="py-3 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Inicia Sesión
            </h1>
            <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm  text-gray-900 font-semibold"
                >
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  {...register("email", { required: true })}
                  placeholder="Correo Electrónico"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.email && (
                  <p className="text-red-700 text-xs">
                    Correo Electrónico es requerido
                  </p>
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
                  name="password"
                  id="password"
                  {...register("password", { required: true })}
                  placeholder="Contraseña"
                  className="bg-gray-300 border border-gray-400 text-gray-900 rounded-lg block w-full p-2.5 "
                />
                {errors.password && (
                  <p className="text-red-700 text-xs">
                    Contraseña es requerida
                  </p>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="text-gray-600" htmlFor="remember">
                      Recuérdame
                    </label>
                  </div>
                </div>
                <a
                  href=""
                  className="text-sm font-medium text-yellow-300 hover:underline"
                >
                  Olvidaste tu contraseña?
                </a>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition duration-200 ease-in-out hover:shadow-lg active:scale-95"
              >
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
