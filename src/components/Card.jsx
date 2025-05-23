import Button from 'react-bootstrap/Button';
import BootstrapCard from 'react-bootstrap/Card';
import './Card.css';


function Card({ title, image, price,onAddToCart }) {
  return (
    <BootstrapCard className="border-0 rounded-4 h-100 shadow hover-shadow" >
      <BootstrapCard.Img 
      variant="top" 
      src={image}
      className="object-fit-cover"
      style={{ height: '200px' }}
       />
      <BootstrapCard.Body className="d-flex flex-column justify-content-between">
        <BootstrapCard.Title className="fw-semibold fs-5">{title}</BootstrapCard.Title>
        <BootstrapCard.Text className="text-muted">Precio: ${price}</BootstrapCard.Text>
        <Button variant="success" size="lg" className="mt-3 w-100" onClick={onAddToCart}>Añadir al carrito</Button>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

export default Card;
