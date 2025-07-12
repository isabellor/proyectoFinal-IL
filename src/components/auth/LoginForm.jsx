import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  
  const toastShown = useRef(false);

  useEffect(() => {
    if (!user && location.pathname === "/login" && !toastShown.current) {
      toast.info(
  "Credenciales de prueba:\nAdmin: admin/1234\nUser: user/1234",
  {
    position: "top-center",   // 
    autoClose: 8000,          
    style: {
      fontSize: "1.2rem",    
      whiteSpace: "pre-line", 
    },
  }
);

      toastShown.current = true;

      setUserName("");
      setPassword("");
    }

    if (location.pathname !== "/login") {
      toastShown.current = false;
    }
  }, [location.pathname, user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userName === "admin" && password === "1234") {
      
      login({ nombre: "Administrador", role: "admin", email: "admin@example.com" });
      navigate("/dashboard");
    } else if (userName === "user" && password === "1234") {
      
      login({ nombre: "Isabel Gómez", role: "user", email: "isa@example.com", direccion: "Av. Corrientes 1234, CABA" });
      navigate("/user-panel");
    } else {
      toast.error("Usuario o contraseña incorrectos");
    }
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="container py-5"
      style={{ maxWidth: 400 }}
      aria-label="Formulario de inicio de sesión"
    >
      <h2 className="mb-4">Iniciar sesión</h2>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="username">Usuario</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          aria-required="true"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Contraseña</Form.Label>
        <Form.Control
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-required="true"
        />
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100">
        Entrar
      </Button>
    </Form>
  );
}
