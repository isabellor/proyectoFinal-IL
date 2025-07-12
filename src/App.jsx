import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/common/Header";
import Hero from "./components/common/Hero";
import Footer from "./components/common/Footer";

import Products from "./components/store/Products";
import Product from "./components/store/Product";

import Dashboard from "./components/dashboard/Dashboard";
import UserPanel from "./components/dashboard/UserPanel";
import UserProfile from "./components/dashboard/UserProfile";

import LoginForm from "./components/auth/LoginForm";
import ShoppingCart from "./components/cart/ShoppingCart";

import ProtectedRoute from "./components/common/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";
import { CartProvider } from "./context/CartContext";

import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <ProductProvider>
            <CartProvider>
              <Header titulo="Proyecto Tienda React" />

              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/productos/:id" element={<Product />} />
                <Route path="/carrito" element={<ShoppingCart />} />
                <Route path="/contacto" element={<Footer />} />

                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-panel"
                  element={
                    <ProtectedRoute allowedRoles={["user"]}>
                      <UserPanel />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user-profile"
                  element={
                    <ProtectedRoute allowedRoles={["admin", "user"]}>
                      <UserProfile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </CartProvider>
          </ProductProvider>
        </AuthProvider>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
