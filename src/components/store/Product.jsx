import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCartContext } from "../../context/CartContext";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Cambia aquí a tu endpoint de MockAPI cuando lo tengas:
        const res = await fetch(`https://6869a2a02af1d945cea243a0.mockapi.io/api/v1/products/${id}`);

        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || "Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" aria-label="Cargando"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-danger py-5" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-danger py-5" role="alert">
        <p>Producto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src={product.image}
            alt={`Imagen de ${product.name || product.title}`}
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{product.name || product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success mb-3">${product.price}</h4>
          <p>{product.description}</p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => addToCart(product)}
            aria-label={`Agregar ${product.name || product.title} al carrito`}
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
