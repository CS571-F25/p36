import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router";

import { useStore } from "../store";
import Flashcard from "../components/flashcard";

export function Component() {
  const { id } = useParams();

  const getSet = useStore((state) => state.getSet);
  const set = getSet(id);
  const updateCardStatus = useStore((s) => s.updateCardStatus);

  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex, setCurrentIdx] = useState(0);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleStatusClick = (status: string) => {
    if (!set) return;
    // Only accept the three known statuses
    const allowed = ["Unsure", "Learning", "Mastered"];
    if (!allowed.includes(status)) return;
    updateCardStatus(
      set.id,
      currentIndex,
      status as "Unsure" | "Learning" | "Mastered",
    );
    setIsFlipped(false);
    // Advance to next card if not at the end
    if (currentIndex < set.cards.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentIdx((prev) => --prev);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIdx((prev) => ++prev);
    setIsFlipped(false);
  };

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

  return (
    <Container style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
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
            {currentIndex + 1} / {set.cards.length}
          </h3>
        </Col>
      </Row>

      {/* Flashcard */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Flashcard
            frontText={set.cards[currentIndex].term}
            backText={set.cards[currentIndex].definition}
            isFlipped={isFlipped}
            onFlip={handleFlip}
          />
        </Col>
      </Row>

      {/* Flip Button */}
      <Row className="mb-4">
        <Col className="text-center">
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
              e.currentTarget.style.borderColor = "var(--strawberry-red-hover)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
              e.currentTarget.style.borderColor = "var(--strawberry-red)";
            }}
          >
            FLIP
          </Button>
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
              disabled={currentIndex === 0}
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
              onClick={handleNext}
              disabled={currentIndex === set.cards.length - 1}
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

      {/* Status Buttons */}
      <Row>
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
              onClick={() => handleStatusClick("Unsure")}
              variant="outline-danger"
              style={{
                borderColor: "var(--strawberry-red)",
                color: "var(--strawberry-red)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                e.currentTarget.style.color = "var(--background)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--strawberry-red)";
              }}
            >
              Unsure
            </Button>
            <Button
              onClick={() => handleStatusClick("Learning")}
              variant="outline-primary"
              style={{
                borderColor: "var(--twilight-indigo)",
                color: "var(--twilight-indigo)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "var(--warning-yellow)";
                e.currentTarget.style.borderColor = "var(--warning-yellow)";
                e.currentTarget.style.color = "var(--ink-black)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "var(--twilight-indigo)";
                e.currentTarget.style.color = "var(--twilight-indigo)";
              }}
            >
              Learning
            </Button>
            <Button
              onClick={() => handleStatusClick("Mastered")}
              variant="outline-success"
              style={{
                borderColor: "var(--vintage-grape)",
                color: "var(--vintage-grape)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "var(--success-green)";
                e.currentTarget.style.borderColor = "var(--success-green)";
                e.currentTarget.style.color = "var(--background)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.borderColor = "var(--vintage-grape)";
                e.currentTarget.style.color = "var(--vintage-grape)";
              }}
            >
              Mastered
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
