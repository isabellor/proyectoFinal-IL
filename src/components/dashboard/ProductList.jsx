import React, { useState } from "react";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";

export default function ProductList({ productos, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleEditClick = (producto) => {
    setEditProduct(producto);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setEditProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    
    if (!editProduct.name.trim()) {
      toast.error("El nombre es obligatorio");
      return;
    }
    if (Number(editProduct.price) <= 0) {
      toast.error("El precio debe ser mayor a 0");
      return;
    }
    if (!editProduct.category.trim()) {
      toast.error("La categoría es obligatoria");
      return;
    }

    try {
      await onUpdate(editProduct);
      toast.success("Producto actualizado correctamente");
      handleClose();
    } catch (error) {
      toast.error("Error al actualizar el producto");
    }
  };

  if (!productos.length) return <p>No hay productos aún.</p>;

  return (
    <>
      <div className="product-list">
        {productos.map(prod => (
          <Row key={prod.id} className="align-items-center mb-3 border-bottom pb-2">
            <Col xs={2}>
              <img
                src={prod.image}
                alt={`Imagen de ${prod.name}`}
                style={{ width: "100%", objectFit: "cover", borderRadius: "4px" }}
              />
            </Col>
            <Col xs={3}><strong>{prod.name}</strong></Col>
            <Col xs={2}>{prod.category}</Col>
            <Col xs={2}>${prod.price}</Col>
            <Col xs={3}>
              <Button
                variant="warning"
                size="sm"
                onClick={() => handleEditClick(prod)}
                className="me-2"
                aria-label={`Editar ${prod.name}`}
              >
                Editar
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => onDelete(prod.id)}
                aria-label={`Eliminar ${prod.name}`}
              >
                Eliminar
              </Button>
            </Col>
          </Row>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        aria-labelledby="edit-product-modal-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="edit-product-modal-title">Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editProduct && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="edit-name">Nombre</Form.Label>
                <Form.Control
                  id="edit-name"
                  name="name"
                  value={editProduct.name}
                  onChange={handleChange}
                  aria-required="true"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="edit-category">Categoría</Form.Label>
                <Form.Control
                  id="edit-category"
                  name="category"
                  value={editProduct.category}
                  onChange={handleChange}
                  aria-required="true"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="edit-price">Precio</Form.Label>
                <Form.Control
                  id="edit-price"
                  name="price"
                  type="number"
                  value={editProduct.price}
                  onChange={handleChange}
                  aria-required="true"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="edit-image">URL Imagen</Form.Label>
                <Form.Control
                  id="edit-image"
                  name="image"
                  value={editProduct.image}
                  onChange={handleChange}
                  aria-required="true"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label htmlFor="edit-description">Descripción</Form.Label>
                <Form.Control
                  id="edit-description"
                  as="textarea"
                  rows={3}
                  name="description"
                  value={editProduct.description}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
