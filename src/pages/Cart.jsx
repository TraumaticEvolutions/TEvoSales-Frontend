import { useEffect, useState } from "react";
import Button from "../components/Button";
import { useNavigate, useLocation } from "react-router-dom";
import { TbMoodSad, TbTrash } from "react-icons/tb";
import { useAuth } from "../context/useAuth";
import Modal from "../components/Modal";

/**
 * Página del carrito de la compra.
 * Muestra los productos añadidos al carrito, permite modificar cantidades y eliminar productos.
 * El carrito se almacena en localStorage y es solo para el usuario actual.
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
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
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
    <div className="min-h-screen bg-gradient-to-br from-[#a7e8f2] via-[#ebfcff] to-white py-10 px-2">
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
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-[#f3fbfd] rounded-xl p-4 sm:p-6 shadow"
                >
                  <img
                    src={
                      item.imagePath || "https://placehold.co/60x60?text=IMG"
                    }
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
                        onChange={(e) =>
                          handleQuantityChange(item.id, e.target.value)
                        }
                        className="w-14 sm:w-20 px-2 py-1 rounded-lg border border-gray-200 bg-[#eaf6ff] text-gray-700 focus:outline-none focus:ring-1 focus:ring-primary text-base"
                      />
                    </div>
                    <Button
                      text={<TbTrash size={20} className="inline-block" />}
                      className="text-lg rounded-full py-2.5"
                      bgColor="bg-red-100"
                      bgColorHover="hover:bg-red-200"
                      txtColor="text-red-700"
                      onClick={() => handleRemove(item.id)}
                    />
                  </div>
                </div>
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
              title="Confirmar compra"
              actions={
                <>
                  <Button
                    text="Cancelar"
                    onClick={() => setModalOpen(false)}
                    bgColor="bg-gray-200"
                    txtColor="text-gray-700"
                  />
                  <Button
                    text="Confirmar"
                    onClick={() => {
                      // Aquí puedes poner la lógica de compra
                      setModalOpen(false);
                    }}
                    bgColor="bg-emerald-600"
                    txtColor="text-white"
                  />
                </>
              }
            >
              <p>¿Estás seguro de que quieres finalizar la compra?</p>
            </Modal>
          </>
        )}
      </div>
    </div>
  );
}
