import { Helmet } from "react-helmet";
import { FaReact } from "react-icons/fa";
import './Hero.css';

function Hero() {
  return (
    <>
      <Helmet>
        <title>Mi Tienda React - Home</title>
        <meta name="description" content="Bienvenido a la mejor tienda React del 2025" />
      </Helmet>
      <section
        className="text-white d-flex flex-column align-items-center justify-content-center text-center"
        style={{
          height: '550px',
          background: 'linear-gradient(135deg, #5B247A, #1B0F43)', // púrpura oscuro degradado
          // backgroundSize y backgroundPosition no hacen falta sin imagen
        }}
        role="img"
        aria-label="Fondo púrpura degradado para bienvenida Tienda React"
      >
        <div className="hero-text p-4">
          <h2 className="display-1">Bienvenidos a Tienda React</h2>
          <p className="display-4 m-0">Disfruten la experiencia</p>
        </div>
        <FaReact className="react-logo" aria-hidden="true" />
      </section>
    </>
  );
}

export default Hero;
