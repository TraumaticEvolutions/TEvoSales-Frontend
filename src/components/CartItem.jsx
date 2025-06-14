import { TbTrash } from "react-icons/tb";
import Button from "./Button";
import PropTypes from "prop-types";

/**
 * Componente que representa un artículo en el carrito de compras.
 *
 * @export
 * @param {{ item: any; handleQuantityChange: any; handleRemove: any; onClick: any; }} param0
 * @param {Object} param0.item
 * @param {function} param0.handleQuantityChange
 * @param {function} param0.handleRemove
 * @param {function} param0.onClick
 * @returns {JSX.Element}
 *
 * @author Ángel Aragón
 */
export default function CartItem({
  item,
  handleQuantityChange,
  handleRemove,
  onClick,
}) {
  return (
    <>
      <article
        key={item.id}
        onClick={onClick}
        role="button"
        className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-[#f3fbfd] rounded-xl p-4 sm:p-6 shadow cursor-pointer"
      >
        <img
          src={item.imagePath || "https://placehold.co/60x60?text=IMG"}
          alt={item.name}
          className="w-20 h-20 sm:w-28 sm:h-28 rounded-xl object-cover bg-gray-100 border border-gray-200"
        />
        <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
          <div className="flex-1">
            <div className="font-semibold text-primary text-base sm:text-lg">
              {item.name}
            </div>
            <div className="text-xs text-gray-500">{item.brand}</div>
            <div className="text-cyan-700 font-bold text-lg mt-1">
              {item.price} €
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs sm:text-sm text-gray-700">
              Unidades:
            </label>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              className="w-14 sm:w-20 px-2 py-1 rounded-lg border border-gray-200 bg-[#eaf6ff] text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary text-base"
            />
          </div>
          <Button
            text={<TbTrash size={20} className="inline-block" />}
            className="text-lg rounded-full py-2.5"
            bgColor="bg-red-100"
            bgColorHover="hover:bg-red-200"
            txtColor="text-red-700"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove(item.id);
            }}
          />
        </div>
      </article>
    </>
  );
}

/**
 * PropTypes para validar las propiedades del componente CartItem.
 *
 * @type {Object}
 * @property {Array} item - Lista de artículos en el carrito.
 * @property {function} handleQuantityChange - Función para manejar el cambio de cantidad.
 * @property {function} handleRemove - Función para manejar la eliminación de un artículo.
 * @author Ángel Aragón
 */
CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
};
