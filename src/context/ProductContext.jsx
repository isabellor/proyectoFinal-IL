import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Leer (GET)
  const fetchProductos = async () => {
    try {
      const res = await axios.get("https://6869a2a02af1d945cea243a0.mockapi.io/api/v1/products");
      setProductos(res.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error al cargar productos");
      setLoading(false);
    }
  };

  // Crear (POST)
  const agregarProducto = async (producto) => {
    try {
      const res = await axios.post("https://6869a2a02af1d945cea243a0.mockapi.io/api/v1/products", producto);
      setProductos(prev => [...prev, res.data]);
      toast.success("Producto agregado");
    } catch (error) {
      toast.error("Error al agregar producto");
    }
  };

  // Actualizar (PUT)
  const editarProducto = async (id, productoActualizado) => {
    try {
      const res = await axios.put(`https://6869a2a02af1d945cea243a0.mockapi.io/api/v1/products/${id}`, productoActualizado);
      setProductos(prev => prev.map(p => (p.id === id ? res.data : p)));
      toast.success("Producto actualizado");
    } catch (error) {
      toast.error("Error al actualizar producto");
    }
  };

  // Borrar (DELETE)
  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`https://6869a2a02af1d945cea243a0.mockapi.io/api/v1/products/${id}`);
      setProductos(prev => prev.filter(p => p.id !== id));
      toast.success("Producto eliminado");
    } catch (error) {
      toast.error("Error al eliminar producto");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        productos,
        loading,
        agregarProducto,
        editarProducto,
        eliminarProducto,
        fetchProductos,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

