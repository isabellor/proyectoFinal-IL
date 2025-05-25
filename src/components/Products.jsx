import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Products({ products, addToCart, loading }) {
  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="container py-5">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-sm-6 col-md-4 col-lg-3" key={product.id}>
            <Card className="border-0 rounded-4 h-100 shadow hover-shadow">
              <Link to={`/productos/${product.id}`}>
                <Card.Img
                  variant="top"
                  src={product.image}
                  className="object-fit-cover"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </Link>

              <Card.Body className="d-flex flex-column justify-content-between">
                <Link
                  to={`/productos/${product.id}`}
                  className="text-decoration-none text-dark"
                >
                  <Card.Title className="fw-semibold fs-5">
                    {product.title}
                  </Card.Title>
                </Link>

                <Card.Text className="text-muted">
                  Precio: ${product.price}
                </Card.Text>

                <Button
                  variant="primary"
                  size="lg"
                  className="mt-2 w-100"
                  onClick={() => addToCart(product)}
                >
                  Añadir al carrito
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
