import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.hash === path;

  return (
    <BootstrapNavbar
      expand="lg"
      style={{
        backgroundColor: "var(--ink-black)",
        padding: "1rem 0",
      }}
      variant="dark"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          style={{
            color: "var(--background)",
            fontWeight: "bold",
            fontSize: "1.5rem",
            textDecoration: "none",
          }}
        >
          ReCall
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/"
              style={{
                color: isActive("/") ? "var(--background)" : "var(--cool-steel)",
                textDecoration: "none",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/sets/new"
              style={{
                color: isActive("/sets/new") ? "var(--background)" : "var(--cool-steel)",
                textDecoration: "none",
              }}
            >
              Create Set
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

