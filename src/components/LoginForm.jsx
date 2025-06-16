import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function LoginForm() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user === "admin" && password === "1234") {
      login(user);
      navigate("/dashboard");
    } else {
      MySwal.fire({
        icon: "error",
        title: "Error de inicio de sesión",
        text: "Usuario o contraseña incorrectos.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="container py-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4">Iniciar sesión</h2>
      <Form.Group className="mb-3">
        <Form.Label>Usuario</Form.Label>
        <Form.Control
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" variant="primary">
        Entrar
      </Button>
    </Form>
  );
}
