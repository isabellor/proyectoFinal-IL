import { useEffect, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

function App() {
  
  const navItems = ["Home", "Productos", "Contacto"];
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);



  const addToCart = (item) => {
    setCartItems([...cartItems, item])
    MySwal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${item.title} ha sido agregado al carrito.`,
      confirmButtonText: "Aceptar",
    });
  };

      
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=>{
              setTimeout(() => {
                setLoading(false);
                setItems(data);
              },3000);// Simulando un tiempo de carga
            })
            .catch((err) => {
        console.error("Error al cargar productos:", err);
        MySwal.fire({
          title: "Error",
          text: "No se pudo cargar la información. Intenta más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        setLoading(false);
      });
  }, []);
  
  
  const toDisplay =  items.slice(0, 24);//carga los primeros 24 productos

  return (
    <div className="App">
      <Header
        titulo="Proyecto Tienda React"
        cartItemCount={cartItems.length}
    
      
      />

      <Nav
        items={navItems}
        //onSelection={handleSelection}
        //active
        // Item={activeItem}
      />
      <Hero/>
      <div className="container mt-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-success mb-3" role="status"></div>
            <p className="text-success fw-semibold">Cargando productos...</p>
          </div>
        ) : (
          <div className="row justify-content-center">
            {toDisplay.map((item) => (
              <div
                key={item.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
              >
                <div className="w-100" style={{ maxWidth: "20rem" }}>
                  <Card
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    onAddToCart={() => addToCart(item)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
