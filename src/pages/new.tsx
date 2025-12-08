import * as React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

import { type Flashcard, useStore } from "../store";

export function Component() {
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);

  const createSet = useStore((state) => state.createSet);

  const navigate = useNavigate();

  const createFlashcardSet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    createSet(name, flashcards);
    navigate("/sets");
  };

  const addFlashcard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const term = String(formData.get("term"));
    const definition = String(formData.get("definition"));
    setFlashcards((prev) => [...prev, { term, definition }]);
    e.currentTarget.reset();
  };

  const deleteFlashcard = (term: string) => {
    setFlashcards((prev) => prev.filter((card) => card.term !== term));
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
        Create New Study Set
      </h1>

      <Row>
        <Col lg={6}>
          <Card className="mb-4" style={{ border: "1px solid var(--cool-steel)" }}>
            <Card.Header
              style={{
                backgroundColor: "var(--twilight-indigo)",
                color: "var(--background)",
                fontWeight: "600",
              }}
            >
              Set Information
            </Card.Header>
            <Card.Body>
              <Form onSubmit={createFlashcardSet}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "var(--ink-black)", fontWeight: "600" }}>
                    Set Name
                  </Form.Label>
                  <Form.Control
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g., Biology 101"
                    style={{
                      borderColor: "var(--cool-steel)",
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  disabled={!flashcards.length}
                  style={{
                    backgroundColor: "var(--strawberry-red)",
                    borderColor: "var(--strawberry-red)",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = "var(--strawberry-red-hover)";
                    e.currentTarget.style.borderColor = "var(--strawberry-red-hover)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                    e.currentTarget.style.borderColor = "var(--strawberry-red)";
                  }}
                >
                  Create Set ({flashcards.length} {flashcards.length === 1 ? "card" : "cards"})
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card style={{ border: "1px solid var(--cool-steel)" }}>
            <Card.Header
              style={{
                backgroundColor: "var(--vintage-grape)",
                color: "var(--background)",
                fontWeight: "600",
              }}
            >
              Add Flashcard
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addFlashcard}>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "var(--ink-black)", fontWeight: "600" }}>
                    Term
                  </Form.Label>
                  <Form.Control
                    id="term"
                    name="term"
                    type="text"
                    required
                    placeholder="Enter the term or question"
                    style={{
                      borderColor: "var(--cool-steel)",
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: "var(--ink-black)", fontWeight: "600" }}>
                    Definition
                  </Form.Label>
                  <Form.Control
                    id="definition"
                    name="definition"
                    as="textarea"
                    rows={3}
                    required
                    placeholder="Enter the definition or answer"
                    style={{
                      borderColor: "var(--cool-steel)",
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  style={{
                    backgroundColor: "var(--ink-black)",
                    borderColor: "var(--ink-black)",
                    color: "var(--background)",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = "var(--background)";
                    e.currentTarget.style.borderColor = "var(--ink-black)";
                    e.currentTarget.style.color = "var(--ink-black)";
                  }}
                  onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.currentTarget.style.backgroundColor = "var(--ink-black)";
                    e.currentTarget.style.borderColor = "var(--ink-black)";
                    e.currentTarget.style.color = "var(--background)";
                  }}
                >
                  Add Card
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card style={{ border: "1px solid var(--cool-steel)" }}>
            <Card.Header
              style={{
                backgroundColor: "var(--ink-black)",
                color: "var(--background)",
                fontWeight: "600",
              }}
            >
              Flashcards ({flashcards.length})
            </Card.Header>
            <Card.Body>
              {flashcards.length === 0 ? (
                <p style={{ color: "var(--vintage-grape)", fontStyle: "italic" }}>
                  No flashcards yet. Add your first card using the form on the left.
                </p>
              ) : (
                <div style={{ maxHeight: "500px", overflowY: "auto" }}>
                  {flashcards.map((flashcard, index) => (
                    <Card
                      key={flashcard.term}
                      className="mb-3"
                      style={{
                        border: "1px solid var(--cool-steel)",
                        backgroundColor: index % 2 === 0 ? "var(--background)" : "rgba(139, 147, 156, 0.05)",
                      }}
                    >
                      <Card.Body>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                          <div style={{ flex: 1 }}>
                            <h6 style={{ color: "var(--ink-black)", fontWeight: "600", marginBottom: "0.5rem" }}>
                              {flashcard.term}
                            </h6>
                            <p style={{ color: "var(--vintage-grape)", margin: 0, fontSize: "0.9rem" }}>
                              {flashcard.definition}
                            </p>
                          </div>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteFlashcard(flashcard.term)}
                            style={{
                              borderColor: "var(--strawberry-red)",
                              color: "var(--strawberry-red)",
                              marginLeft: "1rem",
                            }}
                          >
                          Delete
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
