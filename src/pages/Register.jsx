import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import iconTEVO from "../assets/iconTEVO.svg";
import ErrorMsg from "../components/ErrorMsg";
import { registerRequest } from "../services/api";

/**
 * Componente de registro de usuario
 * Este componente permite a los usuarios registrarse en la aplicación.
 * Utiliza el hook `useForm` de `react-hook-form` para manejar el formulario de registro.
 * @returns {JSX.Element}
 *
 * @author Ángel Aragón
 */
export default function Register() {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      // eslint-disable-next-line no-unused-vars
      const { password2, ...dataToSend } = data;
      await registerRequest(dataToSend);
      navigate("/login", {
        state: { message: "¡Registro exitoso!" },
      });
    } catch (err) {
      if (err.response && err.response.status === 409) {
        setError("El usuario, email o DNI ya existe.");
      } else {
        setError("Error al registrar usuario: " + err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
      <div className="mb-10 mt-10 bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md border border-[#e0f2fe]">
        <div className="flex flex-col items-center mb-6">
          <img src={iconTEVO} alt="Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-3xl font-bold text-primary mb-1">Crear cuenta</h2>
          <p className="text-gray-500 text-sm">
            Regístrate para acceder a TEvoSales
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="username"
            >
              Nombre de usuario
            </label>
            <input
              type="text"
              id="username"
              {...register("username", {
                required: "El nombre de usuario es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              className={`w-full border rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-1 transition ${
                errors.username ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="username"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="name"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "El nombre es obligatorio",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              className={`w-full border rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-1 transition ${
                errors.name ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="name"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Email no válido",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-1 transition ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="nif"
            >
              DNI/NIF
            </label>
            <input
              id="nif"
              type="text"
              {...register("nif", {
                required: "El DNI/NIF es obligatorio",
                pattern: {
                  value: /^[0-9A-Za-z]{7,12}$/,
                  message: "DNI/NIF no válido",
                },
              })}
              className={`w-full border rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-1 transition ${
                errors.nif ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="off"
            />
            {errors.nif && (
              <span className="text-red-500 text-sm">{errors.nif.message}</span>
            )}
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className={`w-full border rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-1 transition ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="new-password"
            />
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="password2"
            >
              Repetir contraseña
            </label>
            <input
              id="password2"
              type="password"
              {...register("password2", {
                required: "Repite la contraseña",
                validate: (value) =>
                  value === watch("password") || "Las contraseñas no coinciden",
              })}
              className={`w-full border rounded-lg px-3 py-2 bg-[#eaf6ff] focus:outline-none focus:ring-1 transition ${
                errors.password2 ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="new-password"
            />
            {errors.password2 && (
              <span className="text-red-500 text-sm">
                {errors.password2.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            bgColor="bg-cyan-700"
            bgColorHover="hover:bg-cyan-500"
            txtColor="text-white"
            className="w-full py-2 text-lg font-semibold rounded-lg shadow transition"
            text={isLoading ? "Registrando..." : "Registrarse"}
            disabled={isLoading}
            ariaLabel={isLoading ? "Registrando..." : "Registrarse"}
          />
          <Button
            type="button"
            bgColor="bg-transparent border-2 border-cyan-700"
            bgColorHover="hover:border-cyan-500"
            txtColor="text-cyan-700 hover:text-cyan-500"
            className="w-full py-2 text-lg font-semibold rounded-lg shadow transition"
            text="¿Ya tienes cuenta? Inicia sesión"
            ariaLabel="Iniciar sesión"
            onClick={() => navigate("/login")}
          />
        </form>
      </div>
    </div>
  );
}
