import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useStore } from "../store";

export function Component() {
  const sets = useStore((state) => state.sets);
  const deleteSet = useStore((state) => state.deleteSet);
  const navigate = useNavigate();

  const handleCreateSet = () => {
    navigate("/sets/new");
  };

  const handleSetClick = (setId: string) => {
    navigate(`/sets/${setId}`);
  };

  const handleDeleteSet = (e: React.MouseEvent, setId: string) => {
    e.stopPropagation(); // Prevent card click
    if (window.confirm("Are you sure you want to delete this set?")) {
      deleteSet(setId);
    }
  };

  const handleEditSet = (e: React.MouseEvent, setId: string) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/sets/${setId}/edit`);
  };

  return (
    <Container
      style={{
        paddingTop: "clamp(1.5rem, 3vw, 2rem)",
        paddingBottom: "clamp(2rem, 5vw, 4rem)",
      }}
    >
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

      {/* Study Sets Grid */}
      {sets.length > 0 ? (
        <Row>
          {sets.map((set) => (
            <Col key={set.id} md={6} lg={4} className="mb-4">
              <Card
                onClick={() => handleSetClick(set.id)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${set.name} study set`}
                onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
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
                  position: "relative",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 8px rgba(0, 0, 0, 0.1)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.outline =
                    "2px solid var(--twilight-indigo)";
                  e.currentTarget.style.outlineOffset = "2px";
                }}
                onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.outline = "none";
                }}
              >
                <Card.Body>
                {/* Edit and delete buttons */}
                <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                  <Button
                      variant="link"
                      onClick={(e) => handleEditSet(e, set.id)}
                      aria-label="Edit set"
                      style={{
                        padding: "0.25rem 0.5rem",
                        color: "var(--twilight-indigo)",
                        textDecoration: "none",
                        lineHeight: "1",
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = "var(--vintage-grape)";
                        e.currentTarget.style.backgroundColor = "rgba(56, 64, 95, 0.1)";
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = "var(--twilight-indigo)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <FaEdit size={18} />
                    </Button>
                    <Button
                      variant="link"
                      onClick={(e) => handleDeleteSet(e, set.id)}
                      aria-label="Delete set"
                      style={{
                        padding: "0.25rem 0.5rem",
                        color: "var(--strawberry-red)",
                        textDecoration: "none",
                        lineHeight: "1",
                      }}
                      onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = "var(--strawberry-red-hover)";
                        e.currentTarget.style.backgroundColor = "rgba(227, 33, 59, 0.1)";
                      }}
                      onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                        e.currentTarget.style.color = "var(--strawberry-red)";
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <FaTrash size={18} />
                    </Button>
                  </div>
                  <Card.Title
                    style={{
                      color: "var(--ink-black)",
                      fontWeight: "600",
                      marginBottom: "0.75rem",
                      paddingRight: "4rem", // Add padding to prevent overlap with buttons
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
                    {set.cards.length}{" "}
                    {set.cards.length === 1 ? "card" : "cards"}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
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

      {/* Create New Set Card */}
      <Row className="mb-4">
        <Col>
          <Card
            onClick={handleCreateSet}
            role="button"
            tabIndex={0}
            aria-label="Create new study set"
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
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
            onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "var(--strawberry-red)";
              e.currentTarget.style.backgroundColor = "rgba(255, 0, 53, 0.05)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "var(--cool-steel)";
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
              e.currentTarget.style.borderColor = "var(--strawberry-red)";
              e.currentTarget.style.backgroundColor = "rgba(255, 0, 53, 0.05)";
              e.currentTarget.style.outline = "2px solid var(--strawberry-red)";
              e.currentTarget.style.outlineOffset = "2px";
            }}
            onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
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
    </Container>
  );
}
