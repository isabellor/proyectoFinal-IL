import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Product({addToCart}) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const agregarAlCarrito = () => {
    addToCart(product);
    Swal.fire({
      icon: "success",
      title: "Producto agregado",
      text: `"${product.title}" se agregó al carrito.`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Cargando producto...</p>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-danger py-5">
        <p>{error}</p>
      </div>
    );

  if (!product)
    return (
      <div className="text-center text-danger py-5">
        <p>Producto no encontrado.</p>
      </div>
    );

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "300px" }}
          />
        </div>
        <div className="col-md-7">
          <h2 className="mb-3">{product.title}</h2>
          <p className="text-muted">{product.category}</p>
          <h4 className="text-success mb-3">${product.price}</h4>
          <p>{product.description}</p>

          <button className="btn btn-primary mt-3" onClick={addToCart}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
}
