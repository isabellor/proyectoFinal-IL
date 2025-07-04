import { useEffect, useState } from "react";
import Header from "./components/Header";
import Product from "./components/Product";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import Cart from "./components/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext"; 
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; 
import "./App.css";

const MySwal = withReactContent(Swal);

function App() {
    
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);


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
         <CartProvider>
         <Header titulo="Proyecto Tienda React"/>

      

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
              />
            }
          />
          <Route
              path="/productos/:id"
              element={<Product/>}
/>
            <Route path="/carrito" element={<Cart />} />

          <Route path="/contacto" element={<Footer />} />
        </Routes>

       </CartProvider>    
      </Router>
     </AuthProvider> 
    </div>
  );
}

export default App;
