import { useCartContext } from "../context/CartContext";
import { Container, Button, ListGroup } from "react-bootstrap";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCartContext();
   return(
    <Container className="py-5">
      <h2 className="mb-4">Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <>
          <ListGroup className="mb-4">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{item.title}</strong> - ${item.price}
                </div>
                <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="primary" onClick={clearCart}>
            Vaciar Carrito
          </Button>
        </>
      )}
    </Container>    
   );}       


