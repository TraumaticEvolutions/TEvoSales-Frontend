/**
 * Footer de TEvoSales.
 *
 * @component
 * @returns {JSX.Element} Footer informativo
 * @author Ángel Aragón
 */

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-6 px-4 md:px-8 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-center md:text-left gap-4">
        <div>
          <p className="font-semibold">
            TEvoSales © {new Date().getFullYear()}
          </p>
          <p className="text-xs">
            Proyecto académico para el IES Doctor Fleming
          </p>
          <p className="text-xs">Desarrollado por Ángel Miguel Cubino Aragón</p>
        </div>

        <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-xs text-gray-500">
          <a href="#" className="hover:text-black transition-colors">
            Aviso Legal
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Política de Privacidad
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
