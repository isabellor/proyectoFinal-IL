// pages/UserPanel.jsx
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { Container, Card, ListGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function UserPanel() {
  const { user, purchaseHistory } = useAuthContext();
  const { cartProducts } = useCartContext();

  const totalQuantity = cartProducts.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <Container className="py-5" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Panel de Usuario</h2>

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Hola, {user?.nombre || user?.name || "Usuario"}!</Card.Title>
          <Card.Text>Bienvenido a tu panel de usuario.</Card.Text>
        </Card.Body>
      </Card>

      {totalQuantity > 0 && (
        <Card className="mb-4 shadow-sm border-warning">
          <Card.Body>
            <Card.Title>Compras en proceso</Card.Title>
            <Card.Text>
              Tienes <strong>{totalQuantity}</strong> productos en tu carrito.
            </Card.Text>
            <Button as={Link} to="/carrito" variant="warning">
              Ir al carrito
            </Button>
          </Card.Body>
        </Card>
      )}

      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Historial de Compras</Card.Title>
          {purchaseHistory.length === 0 ? (
            <p>No tienes compras registradas.</p>
          ) : (
            <ListGroup>
              {purchaseHistory.map((purchase, index) => (
                <ListGroup.Item key={index}>
                  <strong>Fecha:</strong> {new Date(purchase.date).toLocaleString()}
                  <br />
                  <strong>Total:</strong> ${purchase.total.toFixed(2)}
                  <br />
                  <strong>Productos:</strong>
                  <ul>
                    {purchase.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x{item.quantity} - ${item.price.toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
