export default function Button({ children, isLoading, ...props }) {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded"
      disabled={isLoading}
      {...props}
    >
      {isLoading ? "Cargando..." : children}
    </button>
  );
}
