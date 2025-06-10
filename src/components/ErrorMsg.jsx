import { MdError } from "react-icons/md";
import PropTypes from "prop-types";

/**
 * Componente para mostrar mensajes de error.
 *
 * @export
 * @param {{ children: any; }} param0
 * @param {any} param0.children
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function ErrorMsg({ children }) {
  return (
    <div className="text-red-500 text-sm mt-2 border border-red-500 bg-red-100 p-3 rounded-lg">
      <MdError className="inline-block mr-1" /> {children}
    </div>
  );
}

/**
 * PropTypes para ErrorMsg
 * @typedef {Object} ErrorMsgProps
 * @property {React.ReactNode} children - Contenido del mensaje de error.
 * @author Ángel Aragón
 */
ErrorMsg.propTypes = {
  children: PropTypes.node.isRequired,
};
