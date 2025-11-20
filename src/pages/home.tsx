import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

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
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: "bold",
                color: "var(--ink-black)",
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
                borderColor: "var(--strawberry-red)",
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
            <div
              style={{
                backgroundColor: "var(--cool-steel)",
                opacity: 0.2,
                borderRadius: "1rem",
                padding: "4rem 2rem",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px dashed var(--cool-steel)",
              }}
            >
              <p
                style={{
                  color: "var(--vintage-grape)",
                  fontSize: "1rem",
                  fontStyle: "italic",
                }}
              >
                Goldfish illustration placeholder
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
