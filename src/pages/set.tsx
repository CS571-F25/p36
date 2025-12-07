import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";

import { useStore } from "../store";
import Flashcard from "../components/flashcard";

export function Component() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { id } = useParams();

  const getSet = useStore((state) => state.getSet);

  const set = getSet(id);

  if (!set) {
    return (
      <Container
        style={{
          paddingTop: "2rem",
          paddingBottom: "4rem",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "var(--ink-black)" }}>Study set not found</h2>
        <p style={{ color: "var(--vintage-grape)" }}>
          The study set you're looking for doesn't exist.
        </p>
      </Container>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevious = () => {
    setCurrentIdx((prev) => --prev);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => ++prev);
    setIsFlipped(false);
  };

  return (
    <Container style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <Row className="mb-4">
        <Col>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: "bold",
              color: "var(--ink-black)",
              marginBottom: "1rem",
            }}
          >
            {set.name}
          </h1>
        </Col>
      </Row>

      {/* Counter */}
      <Row className="mb-4">
        <Col className="text-center">
          <h3
            style={{
              fontSize: "1.5rem",
              color: "var(--vintage-grape)",
              fontWeight: "600",
            }}
          >
            {currentIdx + 1} / {set.cards.length}
          </h3>
        </Col>
      </Row>

      {/* Flashcard */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Flashcard
            frontText={set.cards[currentIdx].term}
            backText={set.cards[currentIdx].definition}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </Col>
      </Row>

      {/* Navigation Buttons */}
      <Row className="mb-4">
        <Col className="text-center">
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Button
              onClick={handlePrevious}
              disabled={currentIdx === 0}
              variant="outline-primary"
              style={{
                borderColor: "var(--twilight-indigo)",
                color: "var(--twilight-indigo)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
              }}
            >
              Previous
            </Button>
            <Button
              onClick={handleFlip}
              style={{
                backgroundColor: "var(--strawberry-red)",
                borderColor: "var(--strawberry-red)",
                padding: "0.75rem 2rem",
                fontSize: "1rem",
                fontWeight: "600",
              }}
              size="lg"
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor =
                  "var(--strawberry-red-hover)";
                e.currentTarget.style.borderColor =
                  "var(--strawberry-red-hover)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                e.currentTarget.style.borderColor = "var(--strawberry-red)";
              }}
            >
              FLIP
            </Button>
            <Button
              onClick={handleNext}
              disabled={currentIdx === set.cards.length - 1}
              variant="outline-primary"
              style={{
                borderColor: "var(--twilight-indigo)",
                color: "var(--twilight-indigo)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
              }}
            >
              Next
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
