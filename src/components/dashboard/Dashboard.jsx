import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { Container, Button } from "react-bootstrap";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";

export default function Dashboard() {
  //const navigate = useNavigate();
  const { productos } = useContext(ProductContext);
  const [productoEditar, setProductoEditar] = useState(null);

  const editFormRef = useRef(null);

  useEffect(() => {
    if (productoEditar && editFormRef.current) {
      editFormRef.current.scrollIntoView({ behavior: "smooth" });
      editFormRef.current.focus();
    }
  }, [productoEditar]);

 

  return (
    <Container className="py-5">                
      <h1 id="dashboard-title" className="mb-4">
        Dashboard - Gestión de Productos
      </h1>

      <AddProductForm />

      {productoEditar && (
        <div
          ref={editFormRef}
          className="mb-4"
          tabIndex="-1"
          aria-labelledby="edit-product-title"
        >
          <EditProductForm
            producto={productoEditar}
            onClose={() => setProductoEditar(null)}
          />
        </div>
      )}

      {productos.length === 0 ? (
        <p aria-live="polite">No hay productos para mostrar.</p>
      ) : (
        <div className="row g-3" aria-label="Lista de productos">
          {productos.map((product) => (
            <div
              key={product.id}
              className="col-12 d-flex justify-content-between align-items-center border-bottom pb-2"
              role="listitem"
            >
              <div
                className="d-flex align-items-center gap-3"
                style={{ flexGrow: 1 }}
              >
                <img
                  src={product.image}
                  alt={`Imagen de ${product.name}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ minWidth: "200px", flex: 1, marginRight: "1rem" }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{product.name}</strong>
                    <span className="text-primary fw-semibold">
                      ${product.price}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <Button
                  variant="warning"
                  size="sm"
                  aria-label={`Editar ${product.name}`}
                  onClick={() => setProductoEditar(product)}
                >
                  Editar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
