import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router";

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    const hashPath = `#${path}`;
    return location.pathname === path || location.hash === hashPath || location.hash === path;
  };

  return (
    <BootstrapNavbar
      expand="lg"
      style={{
        backgroundColor: "var(--strawberry-red)",
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
                color: isActive("/") || isActive("#/") ? "var(--background)" : "var(--cool-steel)",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/sets"
              style={{
                color: isActive("/sets") || isActive("#/sets") ? "var(--background)" : "var(--cool-steel)",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Study Sets
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/study"
              style={{
                color: isActive("/study") || isActive("#/study") ? "var(--background)" : "var(--cool-steel)",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Study Session
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

