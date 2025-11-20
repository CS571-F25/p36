import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

import { useStore } from "../store";

export function Component() {
  const sets = useStore((state) => state.sets);
  const navigate = useNavigate();

  const handleCreateSet = () => {
    navigate("/sets/new");
  };

  const handleSetClick = (setId: string) => {
    navigate(`/study?setId=${setId}`);
  };

  return (
    <Container style={{ paddingTop: "clamp(1.5rem, 3vw, 2rem)", paddingBottom: "clamp(2rem, 5vw, 4rem)" }}>
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

      {/* Create New Set Card */}
      <Row className="mb-4">
        <Col>
          <Card
            onClick={handleCreateSet}
            role="button"
            tabIndex={0}
            aria-label="Create new study set"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleCreateSet();
              }
            }}
            style={{
              cursor: "pointer",
              border: "2px dashed var(--cool-steel)",
              backgroundColor: "transparent",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--strawberry-red)";
              e.currentTarget.style.backgroundColor = "rgba(255, 0, 53, 0.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--cool-steel)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--strawberry-red)";
              e.currentTarget.style.backgroundColor = "rgba(255, 0, 53, 0.05)";
              e.currentTarget.style.outline = "2px solid var(--strawberry-red)";
              e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--cool-steel)";
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.outline = "none";
            }}
          >
            <Card.Body
              style={{
                padding: "3rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "3rem",
                  color: "var(--strawberry-red)",
                  marginBottom: "1rem",
                }}
              >
                +
              </div>
              <Card.Title
                style={{
                  fontSize: "1.5rem",
                  color: "var(--ink-black)",
                  fontWeight: "600",
                }}
              >
                Create New Set
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Study Sets Grid */}
      {sets.length > 0 && (
        <Row>
          {sets.map((set) => (
            <Col key={set.id} md={6} lg={4} className="mb-4">
              <Card
                onClick={() => handleSetClick(set.id)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${set.name} study set`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSetClick(set.id);
                  }
                }}
                style={{
                  cursor: "pointer",
                  height: "100%",
                  border: "1px solid var(--cool-steel)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onFocus={(e) => {
                  e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.outline = "2px solid var(--twilight-indigo)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.outline = "none";
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
      )}

      {/* Empty State */}
      {sets.length === 0 && (
        <Row>
          <Col className="text-center">
            <p
              style={{
                color: "var(--vintage-grape)",
                fontSize: "1rem",
                fontStyle: "italic",
                marginTop: "2rem",
              }}
            >
              No study sets yet. Create your first set above!
            </p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

