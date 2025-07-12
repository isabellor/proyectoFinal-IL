import { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { ProductContext } from "../../context/ProductContext";

export default function AddProductForm() {
  const { agregarProducto } = useContext(ProductContext);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (Number(price) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }
    if (description.trim().length < 10) {
      toast.error("La descripción debe tener al menos 10 caracteres");
      return;
    }
    if (!image.trim()) {
      toast.error("La URL de la imagen es obligatoria");
      return;
    }

    const nuevoProducto = {
      name,
      price: Number(price),
      description,
      image,
    };

    await agregarProducto(nuevoProducto);

    // Limpia formulario
    setName("");
    setPrice("");
    setDescription("");
    setImage("");
  };

  return (
    <Container className="py-5">
      <h2>Agregar Nuevo Producto</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ingresa la URL de la imagen"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa el nombre del producto"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Ingresa el precio"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe el producto"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
}
