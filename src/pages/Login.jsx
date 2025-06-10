import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { loginRequest } from "../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button";
import iconTEVO from "../assets/iconTEVO.svg";
import ErrorMsg from "../components/ErrorMsg";
import SuccessMsg from "../components/SuccessMsg";

/**
 * Componente de inicio de sesión
 * * Este componente permite a los usuarios iniciar sesión en la aplicación.
 * * Utiliza el hook `useForm` de `react-hook-form` para manejar el formulario de inicio de sesión.
 * * Si el usuario ya tiene un token en el almacenamiento local, se redirige automáticamente a la página principal.
 *
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function Login() {
  const location = useLocation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [successMsg] = useState(location.state?.message || "");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    try {
      const res = await loginRequest(data);
      login(res.token);
      navigate("/");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setError("Usuario o contraseña incorrectos.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white">
      <div className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-md border border-[#e0f2fe]">
        <div className="flex flex-col items-center mb-6">
          <img src={iconTEVO} alt="Logo" className="w-16 h-16 mb-2" />
          <h2 className="text-3xl font-bold text-primary mb-1">
            Iniciar sesión
          </h2>
          <p className="text-gray-500 text-sm">
            Accede a tu cuenta para continuar
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {successMsg && <SuccessMsg>{successMsg}</SuccessMsg>}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          <div>
            <label
              className="block mb-1 font-medium text-gray-700"
              htmlFor="username"
            >
              Usuario
            </label>
            <input
              id="username"
              type="text"
              {...register("username", {
                required: "El usuario es obligatorio",
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition ${
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
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
              })}
              className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="text-red-500 bg- text-sm">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            bgColor="bg-cyan-700"
            bgColorHover="hover:bg-cyan-500"
            txtColor="text-white"
            className="w-full py-2 text-lg font-semibold rounded-lg shadow transition"
            text={isLoading ? "Cargando..." : "Iniciar sesión"}
          />
          <p className="mt-4 text-sm text-center text-gray-500">
            ¿No tienes cuenta?
          </p>
          <Button
            type="button"
            bgColor="bg-transparent border-2 border-cyan-700"
            bgColorHover="hover:border-cyan-500"
            txtColor="text-cyan-700 hover:text-cyan-500"
            className=" w-full py-2 text-lg font-semibold rounded-lg shadow transition"
            text="Regístrate"
            onClick={() => navigate("/register")}
          />
        </form>
      </div>
    </div>
  );
}
