import { RiShoppingBag2Line, RiUser3Line } from "react-icons/ri";
import { FaReact } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useCartContext } from "../../context/CartContext";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";

export default function Header({ titulo }) {
  const { user, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();
  const { cartProducts } = useCartContext();

  const totalQuantity = cartProducts.reduce((acc, p) => acc + p.quantity, 0);

  const handleCartClick = () => navigate("/carrito");

  const handleLoginClick = () => {
    if (!user) navigate("/login");
  };

  return (
    <Navbar expand="md" bg="light" className="shadow-sm sticky-top py-3">
      <Container className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <FaReact size={32} color="#61dafb" className="me-2" aria-hidden="true" />
          <Navbar.Brand as="span" className="fs-3 text-dark m-0">
            {titulo}
          </Navbar.Brand>
        </div>

        <Navbar.Toggle aria-controls="main-navbar" aria-label="Toggle navigation" />
        <Navbar.Collapse id="main-navbar" className="justify-content-center">
          <Nav className="gap-3 text-center" role="menubar" aria-label="Main navigation">
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
          {user ? (
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                id="dropdown-user"
                className="d-flex align-items-center text-dark"
                aria-label={`Menú de usuario: ${user.nombre || user.name}`}
              >
                <RiUser3Line className="me-1" aria-hidden="true" />
                <span>{user.nombre || user.name}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={user.role === "admin" ? "/dashboard" : "/user-panel"}
                >
                  {user.role === "admin" ? "Dashboard" : "Panel de Usuario"}
                </Dropdown.Item>

                <Dropdown.Item as={Link} to="/user-profile">
                  Perfil
                </Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                >
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div
              role="button"
              tabIndex={0}
              className="text-dark fs-5 d-flex align-items-center"
              onClick={handleLoginClick}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleLoginClick();
              }}
              style={{ cursor: "pointer" }}
              aria-label="Iniciar sesión"
            >
              <RiUser3Line className="me-1" aria-hidden="true" />
              Login
            </div>
          )}

          <div
            role="button"
            tabIndex={0}
            className="d-flex align-items-center text-dark fs-5"
            onClick={handleCartClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") handleCartClick();
            }}
            style={{ cursor: "pointer" }}
            aria-label={`Carrito de compras, ${totalQuantity} items`}
          >
            <RiShoppingBag2Line aria-hidden="true" />
            <span className="ms-2" aria-live="polite">{totalQuantity}</span>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
