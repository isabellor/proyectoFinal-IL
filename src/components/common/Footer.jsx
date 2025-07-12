import { FaFacebook, FaTwitter, FaInstagram, FaComments } from "react-icons/fa";
import { Container, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function Footer() {
                
  return (
    <>
      <footer className="bg-dark text-light py-5 mt-5">
        <Container>
          <Row>
            <Col md={6}>
              <h5>Proyecto Tienda React</h5>
              <p>Teléfono: +54 9 11 1234 5678</p>
            </Col>
            <Col
              md={6}
              className="d-flex flex-column align-items-end justify-content-center"
            >
              <div className="d-flex align-items-center mb-2">
                <FaFacebook size={30} className="me-2" />
                <span>@proyectotiendareact</span>
              </div>
              <div className="d-flex align-items-center mb-2">
                <FaTwitter size={30} className="me-2" />
                <span>@proyectotiendareact</span>
              </div>
              <div className="d-flex align-items-center">
                <FaInstagram size={30} className="me-2" />
                <span>@proyectotiendareact</span>
              </div>
            </Col>
          </Row>
           <Row className="mt-3">
          <Col>
            <p className="text-center small">&copy; 2025 Proyecto Tienda React. Todos los derechos reservados.</p>
          </Col>
        </Row>
        </Container>
      </footer>                                                                                                                         </>
  );
}
