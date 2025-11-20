import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router";
import goldfish from "../assets/goldfish.png";

export function Component() {
  const navigate = useNavigate();

  return (
    <Container fluid style={{ padding: 0 }}>
      {/* Hero Section */}
      <Container style={{ paddingTop: "clamp(2rem, 5vw, 4rem)", paddingBottom: "clamp(2rem, 5vw, 4rem)" }}>
        <Row className="align-items-center">
          <Col lg={6}>
            <h1
              style={{
                fontSize: "clamp(6rem, 9vw, 7.5rem)",
                fontWeight: "bold",
                color: "var(--strawberry-red)", 
                marginBottom: "1rem",
              }}
            >
              ReCall
            </h1>
            <h2
              style={{
                fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
                color: "var(--twilight-indigo)",
                marginBottom: "1.5rem",
                fontWeight: "normal",
              }}
            >
              Remember more, Pay nothing.
            </h2>
            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                color: "var(--vintage-grape)",
                marginBottom: "2rem",
                lineHeight: "1.6",
              }}
            >
              A free, accessible study tool focusing on flashcards and adaptive
              practice. No paywall, no subscriptions—just effective learning for
              everyone.
            </p>
            <Button
              onClick={() => navigate("/sets")}
              style={{
                backgroundColor: "var(--strawberry-red)",
                borderColor: "var(--magenta-rose)",
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
              size="lg"
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red-hover)";
                e.currentTarget.style.borderColor = "var(--strawberry-red-hover)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                e.currentTarget.style.borderColor = "var(--strawberry-red)";
              }}
            >
              Start Studying
            </Button>
          </Col>
          <Col lg={6} className="text-center">
            <Image src={goldfish} fluid rounded alt="Geometric Goldfish Image"/>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
