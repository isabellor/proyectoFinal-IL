import { RiShoppingBag2Line } from "react-icons/ri";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export default function Header({ titulo, cartItemCount }) {
  return (
    <header className="bg-light py-3 shadow-sm sticky-top">
      <div className="container d-flex justify-content-between align-items-center gap-3">


        <h1 className="fs-4 text-success m-0">{titulo}</h1>

        <div
          role="button"
          className="d-flex align-items-center text-success fs-5"
          onClick={() => {
            if (cartItemCount === 0) {
              MySwal.fire({
                icon: 'info',
                title: 'Carrito vacío',
                text: 'Aún no agregaste ningún producto.',
                confirmButtonText: 'Ok',
              });
            } else {
              MySwal.fire({
                icon: 'info',
                title: 'Próximamente',
                text: 'Este modal mostrará el carrito en versiones futuras.',
                confirmButtonText: 'Ok',
              });
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <RiShoppingBag2Line />
          <span className="ms-2">{cartItemCount}</span>
        </div>
      </div>
    </header>
  );
}
