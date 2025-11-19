import { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

import { useStore } from "../store";

interface FlashcardProps {
  frontText: string;
  backText: string;
  isFlipped: boolean;
  onFlip: () => void;
}

function Flashcard({ frontText, backText, isFlipped, onFlip }: FlashcardProps) {
  return (
    <Card
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? "Flashcard back side" : "Flashcard front side"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onFlip();
        }
      }}
      style={{
        minHeight: "400px",
        cursor: "pointer",
        border: "2px solid var(--twilight-indigo)",
        borderRadius: "1rem",
        backgroundColor: isFlipped ? "var(--twilight-indigo)" : "var(--background)",
        color: isFlipped ? "var(--background)" : "var(--ink-black)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onFocus={(e) => {
        e.currentTarget.style.outline = "3px solid var(--strawberry-red)";
        e.currentTarget.style.outlineOffset = "3px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.outline = "none";
      }}
    >
      <Card.Body
        style={{
          textAlign: "center",
          padding: "3rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "600",
          }}
        >
          {isFlipped ? backText : frontText}
        </h2>
      </Card.Body>
    </Card>
  );
}

export default function Component() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const getSet = useStore((state) => state.getSet);

  const set = getSet(id!);

  if (!set) {
    return (
      <Container style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
        <Row>
          <Col className="text-center">
            <h2 style={{ color: "var(--vintage-grape)" }}>Set not found</h2>
            <Button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "var(--strawberry-red)",
                borderColor: "var(--strawberry-red)",
                marginTop: "1rem",
              }}
            >
              Go Home
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePrevious = () => {
    setCurrentIdx((prev) => {
      const newIdx = prev - 1;
      setIsFlipped(false);
      return newIdx;
    });
  };

  const handleNext = () => {
    setCurrentIdx((prev) => {
      const newIdx = prev + 1;
      setIsFlipped(false);
      return newIdx;
    });
  };

  return (
    <Container style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      <Row className="mb-3">
        <Col>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              fontWeight: "bold",
              color: "var(--ink-black)",
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "var(--strawberry-red-hover)";
              e.currentTarget.style.borderColor = "var(--strawberry-red-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
              e.currentTarget.style.borderColor = "var(--strawberry-red)";
            }}
          >
            FLIP
          </Button>
        </Col>
      </Row>

      {/* Navigation Buttons */}
      <Row>
        <Col className="text-center">
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Button
              disabled={currentIdx === 0}
              onClick={handlePrevious}
              variant="outline-primary"
              style={{
                borderColor: "var(--twilight-indigo)",
                color: "var(--twilight-indigo)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "var(--twilight-indigo)";
                  e.currentTarget.style.color = "var(--background)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--twilight-indigo)";
              }}
            >
              Previous
            </Button>
            <Button
              disabled={currentIdx === set.cards.length - 1}
              onClick={handleNext}
              variant="outline-primary"
              style={{
                borderColor: "var(--twilight-indigo)",
                color: "var(--twilight-indigo)",
                padding: "0.5rem 1.5rem",
                minWidth: "120px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!e.currentTarget.disabled) {
                  e.currentTarget.style.backgroundColor = "var(--twilight-indigo)";
                  e.currentTarget.style.color = "var(--background)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "var(--twilight-indigo)";
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
