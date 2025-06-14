import { Link } from "react-router-dom";

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
