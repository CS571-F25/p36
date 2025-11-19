import * as React from "react";
import { Container, Row, Col, Card, Form, Button, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";

import { type Flashcard, useStore } from "../store";

export default function Component() {
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);

  const createSet = useStore((state: { createSet: (name: string, cards: Flashcard[]) => string }) => state.createSet);

  const navigate = useNavigate();

  const createFlashcardSet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const id = createSet(name, flashcards);
    navigate(`/sets/${id}`);
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
        <Col lg={6} className="mb-4">
          <Card>
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
                  <Form.Label style={{ fontWeight: "600", color: "var(--ink-black)" }}>
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
                    padding: "0.75rem 2rem",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--strawberry-red-hover)";
                    e.currentTarget.style.borderColor = "var(--strawberry-red-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                    e.currentTarget.style.borderColor = "var(--strawberry-red)";
                  }}
                >
                  Create Set
                </Button>
                {!flashcards.length && (
                  <Form.Text className="text-muted d-block mt-2">
                    Add at least one flashcard to create the set
                  </Form.Text>
                )}
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} className="mb-4">
          <Card>
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
                  <Form.Label style={{ fontWeight: "600", color: "var(--ink-black)" }}>
                    Term
                  </Form.Label>
                  <Form.Control
                    id="term"
                    name="term"
                    type="text"
                    required
                    placeholder="Front of card"
                    style={{
                      borderColor: "var(--cool-steel)",
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ fontWeight: "600", color: "var(--ink-black)" }}>
                    Definition
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    id="definition"
                    name="definition"
                    required
                    placeholder="Back of card"
                    style={{
                      borderColor: "var(--cool-steel)",
                    }}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="outline-primary"
                  style={{
                    borderColor: "var(--twilight-indigo)",
                    color: "var(--twilight-indigo)",
                    fontWeight: "600",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--twilight-indigo)";
                    e.currentTarget.style.color = "var(--background)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "var(--twilight-indigo)";
                  }}
                >
                  Add Card
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {flashcards.length > 0 && (
        <Row>
          <Col>
            <Card>
              <Card.Header
                style={{
                  backgroundColor: "var(--cool-steel)",
                  color: "var(--background)",
                  fontWeight: "600",
                }}
              >
                Flashcards ({flashcards.length})
              </Card.Header>
              <Card.Body style={{ padding: 0 }}>
                <ListGroup variant="flush">
                  {flashcards.map((flashcard, index) => (
                    <ListGroup.Item
                      key={flashcard.term}
                      style={{
                        borderColor: "var(--cool-steel)",
                        padding: "1rem",
                      }}
                    >
                      <Row className="align-items-center">
                        <Col>
                          <div style={{ fontWeight: "600", color: "var(--ink-black)", marginBottom: "0.25rem" }}>
                            {flashcard.term}
                          </div>
                          <div style={{ color: "var(--vintage-grape)", fontSize: "0.9rem" }}>
                            {flashcard.definition}
                          </div>
                        </Col>
                        <Col xs="auto">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => deleteFlashcard(flashcard.term)}
                            style={{
                              borderColor: "var(--strawberry-red)",
                              color: "var(--strawberry-red)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                              e.currentTarget.style.color = "var(--background)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = "transparent";
                              e.currentTarget.style.color = "var(--strawberry-red)";
                            }}
                          >
                            Delete
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
