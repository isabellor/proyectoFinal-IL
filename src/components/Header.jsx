import { useState } from "react";
import { RiShoppingBag2Line, RiUser3Line } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function Header({ titulo, cartItemCount }) {
  const [user, setUser] = useState("");
  const location = useLocation();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLogin = async () => {
    if (user) {
      MySwal.fire({
        icon: "info",
        title: "Acceso a tu cuenta",
        text: "En futuras versiones podrás gestionar tu cuenta desde aquí.",
        confirmButtonText: "Entendido",
      });
      return;
    }

    const { value: formValues } = await MySwal.fire({
      title: "Iniciar sesión",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="Nombre">' +
        '<input id="swal-input2" class="swal2-input" placeholder="Email">' +
        '<input id="swal-input3" type="password" class="swal2-input" placeholder="Contraseña">',
      focusConfirm: false,
      confirmButtonText: "Ingresar",
      preConfirm: () => {
        const name = document.getElementById("swal-input1").value;
        const email = document.getElementById("swal-input2").value;
        const password = document.getElementById("swal-input3").value;

        if (!name || !email || !password) {
          Swal.showValidationMessage("Completá todos los campos");
          return;
        }
        if (!validateEmail(email)) {
          Swal.showValidationMessage("Ingresá un correo electrónico válido");
          return;
        }

        return { name, email, password };
      },
    });

    if (formValues) {
      setUser(formValues.name);
      MySwal.fire("Bienvenido", `Hola, ${formValues.name}!`, "success");
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
              className={
                location.pathname === "/"
                  ? "fw-bold text-primary"
                  : "text-dark"
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/productos"
              className={
                location.pathname === "/productos"
                  ? "fw-bold text-primary"
                  : "text-dark"
              }
            >
              Productos
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contacto"
              className={
                location.pathname === "/contacto"
                  ? "fw-bold text-primary"
                  : "text-dark"
              }
            >
              Contacto
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="d-flex align-items-center gap-3 ms-auto">
          <div
            role="button"
            className="text-dark fs-5 d-flex align-items-center"
            onClick={handleLogin}
            style={{ cursor: "pointer" }}
          >
            <RiUser3Line className="me-1" />
            {user ? user : "Login"}
          </div>
          <div
            role="button"
            className="d-flex align-items-center text-dark fs-5"
            onClick={() => {
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
            }}
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
