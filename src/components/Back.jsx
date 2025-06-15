import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

/** Componente de botón de retroceso
 * Este componente muestra un botón que permite al usuario volver a la página anterior.
 * Utiliza el icono de flecha hacia atrás de `react-icons` para indicar la acción.
 *
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
function Back() {
  const navigate = useNavigate();
  return (
    <Button
      text={
        <span className="flex items-center gap-2">
          <IoArrowBack /> Volver
        </span>
      }
      onClick={() => navigate(-1)}
      className="mb-8 shadow-lg"
      bgColor="bg-white/80"
      bgColorHover="hover:bg-cyan-100"
      txtColor="text-cyan-700"
    />
  );
}

export default Back;
