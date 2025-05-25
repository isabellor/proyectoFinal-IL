import tiendaImg from "../assets/tienda.jpg";
import './Hero.css';

function Hero() {
    return (
      <section
        className="text-white d-flex align-items-center justify-content-center text-center"
        style={{
          height: '550px',
          backgroundImage: `url(${tiendaImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className=" hero-text p-4 ">
          <h2 className="display-1">Bienvenidos a Tienda React</h2>
          <p className="display-4 m-0">Disfruten la experiencia</p>
        </div>
      </section>
    );
  }
  export default Hero;