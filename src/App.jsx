import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";

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
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
