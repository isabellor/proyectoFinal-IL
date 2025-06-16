import { RiShoppingBag2Line, RiUser3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { Navbar, Nav, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Header({ titulo, cartItemCount }) {
  
console.log(useAuthContext());

  const { user } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      // Si querés agregar logout, podés agregarlo acá.
      navigate("/dashboard");
    }
  };

  const handleCartClick = () => {
    if (cartItemCount === 0) {
      MySwal.fire({
        icon: "info",
        title: "Carrito vacío",
        text: "Aún no agregaste ningún producto.",
        confirmButtonText: "Ok",
      });
    } else {
      MySwal.fire({
        icon: "info",
        title: "Próximamente",
        text: "Este modal mostrará el carrito en versiones futuras.",
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <Navbar expand="md" bg="light" className="shadow-sm sticky-top py-3">
      <Container>
        <Navbar.Brand className="fs-4 text-dark">{titulo}</Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-center">
          <Nav className="gap-3 text-center">
            <Nav.Link
              as={Link}
              to="/"
              className={location.pathname === "/" ? "fw-bold text-primary" : "text-dark"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/productos"
              className={location.pathname === "/productos" ? "fw-bold text-primary" : "text-dark"}
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              className={location.pathname === "/contacto" ? "fw-bold text-primary" : "text-dark"}
            >
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <div
            role="button"
            className="text-dark fs-5 d-flex align-items-center"
            onClick={handleLoginClick}
            style={{ cursor: "pointer" }}
          >
            <RiUser3Line className="me-1" />
            {user ? user : "Login"}
          </div>

          <div
            role="button"
            className="d-flex align-items-center text-dark fs-5"
            onClick={handleCartClick}
            style={{ cursor: "pointer" }}
          >
            <RiShoppingBag2Line />
            <span className="ms-2">{cartItemCount}</span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
