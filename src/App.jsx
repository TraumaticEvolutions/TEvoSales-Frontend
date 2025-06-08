import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
