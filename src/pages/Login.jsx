import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/useAuth";
import { loginRequest } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button";

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
  const { login } = useAuth();
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
  } = useForm();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setError("");
    setIsLoading(true);
    console.log("Datos enviados:", data);
    try {
      const res = await loginRequest(data);
      console.log("Respuesta del servidor:", res);
      login(res.token);
      navigate("/");
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError(
        err.response?.data?.message
          ? "Credenciales incorrectas: " + err.response.data.message
          : "Credenciales incorrectas o error de conexión"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 p-4 border rounded"
    >
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>
      <div className="mb-4">
        <label className="block mb-1">Usuario</label>
        <input
          type="text"
          {...register("username", { required: "El usuario es obligatorio" })}
          className="w-full border px-2 py-1 rounded"
        />
        {errors.username && (
          <span className="text-red-500">{errors.username.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label className="block mb-1">Contraseña</label>
        <input
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
          })}
          className="w-full border px-2 py-1 rounded"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <Button isLoading={isLoading}>Entrar</Button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
}
