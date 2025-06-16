import PropTypes from "prop-types";
/**
 * Componente para mostrar una lista en formato tabla.
 * @param {Object[]} columns - Array de objetos que definen las columnas de la tabla.
 * @param {Object[]} data - Array de objetos que representan las filas de la tabla.
 * @param {Function} [rowProps] - Función opcional para definir propiedades adicionales de cada fila.
 * @returns {JSX.Element}
 * @author Ángel Aragón
 */
export default function List({ columns, data, rowProps }) {
  return (
    <div className="overflow-x-auto w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`px-1 sm:px-4 py-2 text-left font-semibold text-cyan-700 ${
                  col.className || ""
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-1 sm:px-4 py-6 text-center text-gray-400"
              >
                No hay resultados.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} {...(rowProps ? rowProps(row) : {})}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-1 sm:px-4 py-3 text-sm text-gray-700 ${
                      col.className || ""
                    }`}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

/**
 * PropTypes para el componente List
 * @typedef {Object} ListProps
 * @property {Array<{ key: string, label: string, render?: function }>} columns - Definición de las columnas de la tabla.
 * @property {Array<Object>} data - Datos a mostrar en la tabla.
 * @property {function} [rowProps] - Función opcional para definir propiedades adicionales de cada fila.
 * @author Ángel Aragón
 */
List.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      render: PropTypes.func,
      className: PropTypes.string, // Añade esto si quieres validación estricta
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowProps: PropTypes.func,
};
