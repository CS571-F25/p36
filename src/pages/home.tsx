import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router";

import { useStore } from "../store";

function Component() {
  const sets = useStore((state: { sets: Array<{ id: string; name: string; cards: Array<unknown> }> }) => state.sets);

  return (
    <Container style={{ paddingTop: "clamp(1.5rem, 3vw, 2rem)", paddingBottom: "clamp(2rem, 5vw, 4rem)" }}>
      {sets.length ? (
        <>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "var(--ink-black)",
              marginBottom: "2rem",
            }}
          >
            Study Sets
          </h1>
          <Row>
            {sets.map((set: { id: string; name: string; cards: Array<unknown> }) => (
              <Col key={set.id} md={6} lg={4} className="mb-4">
                <Card
                  as={Link}
                  to={`/sets/${set.id}`}
                  style={{
                    cursor: "pointer",
                    height: "100%",
                    border: "1px solid var(--cool-steel)",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <Card.Body>
                    <Card.Title
                      style={{
                        color: "var(--ink-black)",
                        fontWeight: "600",
                        marginBottom: "0.75rem",
                      }}
                    >
                      {set.name}
                    </Card.Title>
                    <Card.Text
                      style={{
                        color: "var(--vintage-grape)",
                        fontSize: "0.9rem",
                      }}
                    >
                      {set.cards.length} {set.cards.length === 1 ? "card" : "cards"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Row className="align-items-center" style={{ minHeight: "60vh" }}>
          <Col className="text-center">
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
            <Link
              to="/sets/new"
              style={{
                display: "inline-block",
                backgroundColor: "var(--strawberry-red)",
                borderColor: "var(--strawberry-red)",
                color: "var(--background)",
                padding: "0.75rem 2rem",
                fontSize: "1.1rem",
                fontWeight: "600",
                borderRadius: "0.375rem",
                textDecoration: "none",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red-hover)";
                e.currentTarget.style.borderColor = "var(--strawberry-red-hover)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                e.currentTarget.style.borderColor = "var(--strawberry-red)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Create Your First Set
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Component;
