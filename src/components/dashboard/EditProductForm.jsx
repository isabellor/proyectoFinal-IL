import { useState, useContext } from "react";
import { Form, Button, Container, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { ProductContext } from "../../context/ProductContext";

export default function EditProductForm({ producto, onClose }) {
  const { editarProducto, eliminarProducto } = useContext(ProductContext);

  const [name, setName] = useState(producto.name);
  const [price, setPrice] = useState(producto.price);
  const [description, setDescription] = useState(producto.description);
  const [image, setImage] = useState(producto.image);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    const datosActualizados = {
      name,
      price: Number(price),
      description,
      image,
    };

    await editarProducto(producto.id, datosActualizados);
    onClose();
  };

  const handleDeleteClick = () => setShowConfirm(true);

  const handleConfirmDelete = async () => {
    setShowConfirm(false);
    try {
      await eliminarProducto(producto.id);
      
      
    } catch (error) {
      toast.error("Error al eliminar el producto");
    }
  };

  const handleCancelDelete = () => setShowConfirm(false);

  return (
    <Container className="py-3">
      <h4>Editar Producto</h4>
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

        <div className="d-flex justify-content-end">
          <Button variant="danger" className="me-auto" onClick={handleDeleteClick}>
            Eliminar Producto
          </Button>
          <Button variant="secondary" className="me-2" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </div>
      </Form>

      {/* Modal de confirmación */}
      <Modal show={showConfirm} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro que deseas eliminar este producto? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
