import { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

export default function UserProfile() {
  const { user, updateUser } = useAuthContext();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nombre: user.nombre || "",
        email: user.email || "",
        direccion: user.direccion || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(formData);
    toast.success("Perfil actualizado con éxito");

  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="nombre">
        <Form.Label>Nombre</Form.Label>
        <Form.Control
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="direccion">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
        />
      </Form.Group>

      <Button type="submit">Guardar Cambios</Button>
    </Form>
  );
}
