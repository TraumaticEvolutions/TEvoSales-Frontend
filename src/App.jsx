import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";
import PrivateRoute from "./routes/PrivateRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminProducts from "./pages/AdminProducts";

/**
 * Componente principal de la aplicación
 *
 * @returns {JSX.Element}
 * @Author Ángel Aragón
 */
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/market" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<PrivateRoute children={<Cart />} />} />
        <Route
          path="/orders"
          element={<PrivateRoute children={<MyOrders />} />}
        />
        <Route
          path="*"
          element={
            <h1 className="text-center text-2xl">Página no encontrada</h1>
          }
        />
        <Route
          path="/admin/"
          element={<AdminRoute children={<AdminDashboard />} />}
        />
        <Route
          path="/admin/users"
          element={<AdminRoute children={<AdminUsers />} />}
        />
        <Route
          path="/admin/orders"
          element={<AdminRoute children={<AdminOrders />} />}
        />
        <Route
          path="/admin/products"
          element={<AdminRoute children={<AdminProducts />} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
