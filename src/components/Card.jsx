import Card from "./Card";
import { Link } from "react-router-dom";

function Products({ products, addToCart, loading }) {
  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <div className="h-100">
              <Link to={`/productos/${product.id}`} className="text-decoration-none text-dark">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid mb-2"
                  style={{ height: "200px", objectFit: "cover", width: "100%" }}
                />
                <h5>{product.title}</h5>
              </Link>

              <p className="text-muted">Precio: ${product.price}</p>
              <Button
                variant="primary"
                size="lg"
                className="mt-2 w-100"
                onClick={() => addToCart(product)}
              >
                Añadir al carrito
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
