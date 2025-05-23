import { Nav as BootstrapNav, Navbar, Container } from "react-bootstrap";

function Nav({ items, onSelection, activeItem }) {
  return (
    <Navbar bg="light" expand="md" className="shadow-sm border-bottom">
      <Container>
        <BootstrapNav className="mx-auto">
          {items.map((item) => (
            <BootstrapNav.Link
              key={item}
              onClick={() => onSelection(item)}
              active={item === activeItem}
              className="px-3 fw-semibold text-success"
            >
              {item}
            </BootstrapNav.Link>
          ))}
        </BootstrapNav>
      </Container>
    </Navbar>
  );
}
export default Nav;