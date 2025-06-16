import { useEffect, useState } from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MySwal = withReactContent(Swal);

function App() {
  
  const [cartItems, setCartItems] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    MySwal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `${item.title} ha sido agregado al carrito.`,
      confirmButtonText: "Aceptar",
    });
  };

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setLoading(false);
          setItems(data);
        }, 3000); // Simulando un tiempo de carga
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

  return (
      <div className="App">
      
       <AuthProvider> 
        <Router>
         <Header titulo="Proyecto Tienda React" cartItemCount={cartItems.length} />

      

        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={



              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>



            }
          />
          <Route
            path="/productos"
            element={
              <Products
                products={items}
                loading={loading}
                addToCart={addToCart}
              />
            }
          />
          <Route
              path="/productos/:id"
              element={<Product addToCart={addToCart} />}
/>

          <Route path="/contacto" element={<Footer />} />
        </Routes>

         
     </Router>
     </AuthProvider> 
    </div>
  );
}

export default App;
