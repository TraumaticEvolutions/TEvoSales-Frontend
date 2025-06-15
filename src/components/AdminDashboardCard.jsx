import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Componente para mostrar una tarjeta en el panel de administración.
 * @param {Object} param0
 * @param {JSX.Element} param0.icon - Icono de la tarjeta.
 * @param {string} param0.title - Título de la tarjeta.
 * @param {string} param0.description - Descripción de la tarjeta.
 * @param {string} param0.to - Ruta a la que redirige la tarjeta.
 * @param {boolean} [param0.disabled=false] - Si la tarjeta está deshabilitada.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function AdminDashboardCard({
  icon,
  title,
  description,
  to,
  disabled = false,
}) {
  const content = (
    <Link
      to={disabled ? "#" : to}
      className={`bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-all duration-300
        ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:bg-[#f0f9ff] hover:shadow-2xl"
        }
      `}
    >
      <div className="mb-2 text-4xl text-cyan-600">{icon}</div>
      <span className="text-lg font-semibold text-cyan-700 mb-1">{title}</span>
      <span className="text-gray-500 text-sm text-center">{description}</span>
    </Link>
  );

  return disabled ? <div>{content}</div> : <Link to={to}>{content}</Link>;
}

/**
 * PropTypes para AdminDashboardCard
 * @typedef {Object} AdminDashboardCardProps
 * @property {JSX.Element} icon - Icono de la tarjeta.
 * @property {string} title - Título de la tarjeta.
 * @property {string} description - Descripción de la tarjeta.
 * @property {string} to - Ruta a la que redirige la tarjeta.
 * @property {boolean} [disabled] - Si la tarjeta está deshabilitada.
 * @author Ángel Aragón
 */
AdminDashboardCard.propTypes = {
  icon: PropTypes.element.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};
AdminDashboardCard.defaultProps = {
  disabled: false,
};
