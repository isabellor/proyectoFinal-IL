import {
  Container, Row, Col, Card, Button, ListGroup, Image,
  Modal, ProgressBar, Form
} from "react-bootstrap";
import { useState } from "react";
import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

export default function ShoppingCart() {
  const { cartProducts, addToCart, decrementQuantity, removeFromCart, clearCart } = useCartContext();
  const { user, addPurchase } = useAuthContext();
  const navigate = useNavigate();

  const total = cartProducts.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const ivaTotal = total * 0.21;
  const subtotal = total - ivaTotal;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [cardData, setCardData] = useState({
    cardNumber: "1234 5678 9012 3456",
    name: user ? user.name : "Invitado",
    expiry: "12/27",
    cvv: "123",
  });

  const handleCardChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePurchase = () => {
    if (cartProducts.length === 0) {
      toast.error("Tu carrito está vacío.");
      return;
    }
    if (!user) {
      setShowLoginModal(true);
    } else {
      setShowCardModal(true);
    }
  };

  const handleContinueWithoutLogin = () => {
    setShowLoginModal(false);
    setShowCardModal(true);
  };

  const handleGoToLogin = () => {
    setShowLoginModal(false);
    navigate("/login");
  };

  const handleConfirmPayment = () => {
    setShowCardModal(false);
    setShowProgress(true);
    let value = 0;
    const interval = setInterval(() => {
      value += 20;
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
        setShowProgress(false);
        setProgress(0);

        if (user) {
          const newPurchase = {
            date: new Date().toISOString(),
            items: cartProducts.map(p => ({
              name: p.name,
              price: p.price,
              quantity: p.quantity,
            })),
            total,
          };
          addPurchase(newPurchase);
        }

        setShowSuccessModal(true);
      }
    }, 200);
  };

  const handleDownloadInvoice = () => {
    const doc = new jsPDF();
    const facturaNro = Math.floor(Math.random() * 1000000);
    doc.text(`Factura Nº ${facturaNro}`, 14, 20);
    doc.text(`Cliente: ${cardData.name}`, 14, 30);

    const tableData = cartProducts.map((p) => [
      p.name,
      `$${p.price.toFixed(2)}`,
      p.quantity,
      `$${(p.price * p.quantity).toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [["Producto", "Precio", "Cantidad", "Subtotal"]],
      body: tableData,
      startY: 40,
    });

    const finalY = doc.lastAutoTable.finalY + 10;
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, finalY);
    doc.text(`IVA (21%): $${ivaTotal.toFixed(2)}`, 14, finalY + 10);
    doc.text(`Total: $${total.toFixed(2)}`, 14, finalY + 20);

    doc.save(`factura_${facturaNro}.pdf`);
    setShowSuccessModal(false); 
    clearCart(); 
  };

  return (
    <Container className="py-5">
      <Row className="g-4">
        <Col xs={12} md={8}>
          <Card className="h-100">
            <Card.Body>
              <h2 className="mb-4">Carrito de Compras</h2>
              {cartProducts.length === 0 ? (
                <p>Tu carrito está vacío.</p>
              ) : (
                cartProducts.map((product) => (
                  <Card key={product.id} className="mb-3 border-0 border-bottom pb-3">
                    <Row className="align-items-center gy-3 flex-column flex-md-row">
                      {/* Imagen */}
                      <Col xs={12} md="auto" className="text-center mb-2 mb-md-0">
                        <Image
                          src={product.image}
                          fluid
                          rounded
                          style={{ maxWidth: "80px", height: "auto" }}
                        />
                      </Col>

                      {/* Nombre */}
                      <Col xs={12} md className="text-break text-center text-md-start mb-2 mb-md-0">
                        <h6 className="mb-1">{product.name}</h6>
                      </Col>

                      {/* Controles */}
                      <Col xs={12} md className="d-flex flex-wrap align-items-center justify-content-center gap-2 mb-2 mb-md-0">
                        <Button variant="outline-secondary" size="sm" onClick={() => decrementQuantity(product.id)}>
                          -
                        </Button>
                        <div className="px-2 fw-bold">{product.quantity}</div>
                        <Button variant="outline-secondary" size="sm" onClick={() => addToCart(product)}>
                          +
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => removeFromCart(product.id)}>
                          Eliminar
                        </Button>
                      </Col>

                      {/* Precio */}
                      <Col xs={12} md="auto" className="text-center text-md-end">
                        <h6 className="mb-0">${(product.price * product.quantity).toFixed(2)}</h6>
                      </Col>
                    </Row>
                  </Card>
                ))
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <h4 className="mb-4">Resumen</h4>
              <ListGroup variant="flush" className="mb-4">
                <ListGroup.Item>Subtotal: ${subtotal.toFixed(2)}</ListGroup.Item>
                <ListGroup.Item>IVA (21%): ${ivaTotal.toFixed(2)}</ListGroup.Item>
                <ListGroup.Item>
                  <strong>Total: ${total.toFixed(2)}</strong>
                </ListGroup.Item>
              </ListGroup>
              <Button variant="dark" size="lg" className="w-100" onClick={handlePurchase}>
                Comprar
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modales */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Deseas iniciar sesión para guardar tu compra?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleContinueWithoutLogin}>Continuar sin registrarse</Button>
          <Button variant="primary" onClick={handleGoToLogin}>Iniciar Sesión</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCardModal} onHide={() => setShowCardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Número de tarjeta</Form.Label>
              <Form.Control name="cardNumber" value={cardData.cardNumber} onChange={handleCardChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control name="name" value={cardData.name} onChange={handleCardChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expira</Form.Label>
              <Form.Control name="expiry" value={cardData.expiry} onChange={handleCardChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <Form.Control name="cvv" value={cardData.cvv} onChange={handleCardChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCardModal(false)}>Cancelar</Button>
          <Button variant="success" onClick={handleConfirmPayment}>Confirmar Compra</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showProgress} backdrop="static" keyboard={false}>
        <Modal.Body>
          <p>Procesando compra...</p>
          <ProgressBar animated now={progress} label={`${progress}%`} />
        </Modal.Body>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>¡Compra realizada con éxito!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tu compra ha sido completada correctamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDownloadInvoice}>Descargar Factura</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
