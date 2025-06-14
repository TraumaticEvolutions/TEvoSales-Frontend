import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { TbMoodSad, TbTrash } from "react-icons/tb";
import { useAuth } from "../context/useAuth";
import Modal from "../components/Modal";
import { useForm } from "react-hook-form";
import { newOrder } from "../services/api";
import { FaCreditCard } from "react-icons/fa";
import CartItem from "../components/CartItem";

/**
 * Página del carrito de la compra.
 * Muestra los productos añadidos al carrito, permite modificar cantidades y eliminar productos.
 * El carrito se almacena en localStorage y es solo para el usuario actual.
 * Permite finalizar la compra y solicitar una orden con los datos de envío.
 * Este componente utiliza `react-hook-form` para manejar el formulario de envío.
 *
 * @author Ángel Aragón
 * @returns {JSX.Element}
 */
export default function Cart() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const orderData = {
      address: data.address,
      number: data.number,
      floor: data.floor,
      postalCode: data.postalCode,
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };
    newOrder(orderData).then(() => {
      setCart([]);
      localStorage.removeItem(`cart_${user.sub}`);
      reset();
      setModalOpen(false);
      console.log("Compra realizada:", orderData);
      navigate("/market");
    });
  };

  useEffect(() => {
    const stored = localStorage.getItem(`cart_${user.sub}`);
    setCart(stored ? JSON.parse(stored) : []);
  }, [user, location.key, navigate]);

  const handleQuantityChange = (id, value) => {
    setCart((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Number(value)) }
          : item
      );
      localStorage.setItem(`cart_${user.sub}`, JSON.stringify(updated));
      return updated;
    });
  };

  const handleRemove = (id) => {
    setCart((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      localStorage.setItem(`cart_${user.sub}`, JSON.stringify(updated));
      return updated;
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white py-10 px-2">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center drop-shadow">
          Carrito de la compra
        </h1>
        {cart.length === 0 ? (
          <div className="bg-white/80 rounded-2xl shadow-lg p-10 text-center">
            <p className="text-lg text-gray-500 mb-6">
              <TbMoodSad className="inline-block text-4xl text-gray-500 mb-2" />
              <br />
              Tu carrito está vacío.
            </p>
            <Button
              text="Ver productos"
              className="text-lg"
              onClick={() => navigate("/market")}
              bgColor="bg-cyan-700"
              bgColorHover="hover:bg-cyan-800"
              txtColor="text-white"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemove={handleRemove}
                  onClick={() => navigate(`/products/${item.id}`)}
                />
              ))}
            </div>
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
              <div className="text-lg sm:text-xl font-bold text-gray-700">
                Total:{" "}
                <span className="text-cyan-700">{total.toFixed(2)} €</span>
              </div>
              <Button
                text="Finalizar compra"
                className="text-base sm:text-lg px-6 sm:px-8 py-2"
                bgColor="bg-emerald-600"
                bgColorHover="hover:bg-emerald-700"
                txtColor="text-white"
                onClick={() => setModalOpen(true)}
              />
            </div>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title={
                <>
                  <FaCreditCard className="inline-block mr-2 mb-1" />
                  Confirmar compra
                </>
              }
              actions={
                <>
                  <Button
                    text="Cancelar"
                    onClick={() => {
                      setModalOpen(false);
                      reset();
                    }}
                    bgColor="bg-gray-300"
                    ariaLabel="Cancelar compra"
                    txtColor="text-gray-700"
                  />
                  <Button
                    text="Confirmar"
                    onClick={() => {
                      handleSubmit(onSubmit)();
                    }}
                    bgColor="bg-emerald-600"
                    ariaLabel="Confirmar compra"
                    txtColor="text-white"
                  />
                </>
              }
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <input
                  type="hidden"
                  {...register("cartItems")}
                  value={JSON.stringify(cart)}
                />
                <label className="font-medium text-gray-700" htmlFor="address">
                  Dirección:
                  <input
                    {...register("address", {
                      required: "La dirección es obligatoria",
                    })}
                    className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.address ? "border-red-600" : "border-gray-300"
                    }`}
                    id="address"
                    placeholder="Calle Ejemplo"
                  />
                  {errors.address && (
                    <span className="text-red-600 text-xs">
                      {errors.address.message}
                    </span>
                  )}
                </label>
                <label className="font-medium text-gray-700" htmlFor="number">
                  Número:
                  <input
                    {...register("number", {
                      required: "El número es obligatorio",
                    })}
                    className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.number ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Ej: 4B"
                    type="text"
                    id="number"
                  />
                  {errors.number && (
                    <span className="text-red-600 text-xs">
                      {errors.number.message}
                    </span>
                  )}
                </label>
                <label className="font-medium text-gray-700" htmlFor="floor">
                  Piso:
                  <input
                    {...register("floor")}
                    className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.floor ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Ej: 2A"
                    type="text"
                    id="floor"
                  />
                </label>
                <label
                  className="font-medium text-gray-700"
                  htmlFor="postalCode"
                >
                  Código Postal:
                  <input
                    {...register("postalCode", {
                      required: "El código postal es obligatorio",
                    })}
                    className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.postalCode ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="Ej: 28080"
                    type="text"
                    id="postalCode"
                  />
                  {errors.postalCode && (
                    <span className="text-red-600 text-xs">
                      {errors.postalCode.message}
                    </span>
                  )}
                </label>
                <label className="font-medium text-gray-700" htmlFor="card">
                  Tarjeta de crédito/débito:
                  <input
                    {...register("card", {
                      required: "La tarjeta es obligatoria",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "Introduce 16 dígitos",
                      },
                    })}
                    className={`mt-1 w-full border rounded px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.card ? "border-red-600" : "border-gray-300"
                    }`}
                    placeholder="1234 5678 9012 3456"
                    maxLength={16}
                    inputMode="numeric"
                    type="text"
                    id="card"
                  />
                  {errors.card && (
                    <span className="text-red-600 text-xs">
                      {errors.card.message}
                    </span>
                  )}
                </label>
              </form>
            </Modal>
          </>
        )}
      </div>
    </section>
  );
}
