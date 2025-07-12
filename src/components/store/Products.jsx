import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Pagination from "react-bootstrap/Pagination";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useCartContext } from "../../context/CartContext";
import { ProductContext } from "../../context/ProductContext";
import { Helmet } from "react-helmet";

export default function Products() {
  const { productos, loading } = useContext(ProductContext);
  const { addToCart } = useCartContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 4;

  const filteredProducts = productos.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Cargando productos...</p>;

  return (
    <>
      <Helmet>
        <title>Tienda React - Productos</title>
        <meta
          name="description"
          content="Explora nuestros productos en la Tienda React."
        />
      </Helmet>

      <div className="container py-5">
        <Form.Control
          type="text"
          placeholder="Buscar productos..."
          className="mb-4"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          aria-label="Buscar productos"
        />

        <div className="row g-4">
          {currentProducts.map((product) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex"
              key={product.id}
            >
              <Card className="border-0 rounded-4 shadow w-100 h-100">
                <Link
                  to={`/productos/${product.id}`}
                  aria-label={`Ver detalles de ${product.name}`}
                >
                  <Card.Img
                    variant="top"
                    src={product.image}
                    alt={`Imagen de ${product.name}`}
                    className="img-fluid rounded-top"
                    style={{
                        aspectRatio: "4/3",
                       objectFit: "cover",
                       width: "100%",
                       height: "auto",
                            }}
                  />
                </Link>

                <Card.Body className="d-flex flex-column justify-content-between">
                  <Link
                    to={`/productos/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <Card.Title className="fw-semibold fs-5">
                      {product.name}
                    </Card.Title>
                  </Link>

                  <Card.Text className="text-muted">
                    Precio: ${product.price}
                  </Card.Text>

                  <Button
                    variant="primary"
                    size="md"
                    className="mt-2 w-100"
                    onClick={() => addToCart(product)}
                    aria-label={`Añadir ${product.name} al carrito`}
                  >
                    Añadir al carrito
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                aria-label="Página anterior"
              >
                <FaArrowLeft className="me-1" /> Anterior
              </Pagination.Prev>

              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                  aria-label={`Ir a la página ${i + 1}`}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                aria-label="Página siguiente"
              >
                Siguiente <FaArrowRight className="ms-1" />
              </Pagination.Next>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}
