import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartProducts(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartProducts));
  }, [cartProducts]);

  const addToCart = (product) => {
    setCartProducts(prevProducts => {
      const existing = prevProducts.find(p => p.id === product.id);
      if (existing) {
        return prevProducts.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  const decrementQuantity = (id) => {
    setCartProducts(prevProducts =>
      prevProducts
        .map(p => p.id === id ? { ...p, quantity: p.quantity - 1 } : p)
        .filter(p => p.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartProducts(prevProducts => prevProducts.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCartProducts([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{ cartProducts, addToCart, decrementQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCartContext = () => useContext(CartContext);
