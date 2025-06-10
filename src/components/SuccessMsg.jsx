import PropTypes from "prop-types";
import { TiTick } from "react-icons/ti";

/**
 * Componente para mostrar mensajes de éxito.
 *
 * @export
 * @param {{ children: any; }} param0
 * @param {any} param0.children
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function SuccessMsg({ children }) {
  return (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-center">
      <TiTick size={20} className="inline-block mr-2 mb-0.4" /> {children}
    </div>
  );
}

/**
 * PropTypes para SuccessMsg
 * @typedef {Object} SuccessMsgProps
 * @property {React.ReactNode} children - Contenido del mensaje de éxito.
 * @author Ángel Aragón
 */
SuccessMsg.propTypes = {
  children: PropTypes.node.isRequired,
};
