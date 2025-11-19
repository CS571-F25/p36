import { useState } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

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

export default function StudySession() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [currentIndex] = useState(1);
  const totalCards = 24;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleStatusClick = (status: string) => {
    // TODO: implement status tracking later
    // Placeholder for future status tracking functionality
  };

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
            {currentIndex} / {totalCards}
          </h3>
        </Col>
      </Row>

      {/* Flashcard */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Flashcard
            frontText="Front of card"
            backText="Back of card"
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

      {/* Status Buttons */}
      <Row>
        <Col className="text-center">
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--strawberry-red)";
                e.currentTarget.style.color = "var(--background)";
              }}
              onMouseLeave={(e) => {
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--warning-yellow)";
                e.currentTarget.style.borderColor = "var(--warning-yellow)";
                e.currentTarget.style.color = "var(--ink-black)";
              }}
              onMouseLeave={(e) => {
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
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--success-green)";
                e.currentTarget.style.borderColor = "var(--success-green)";
                e.currentTarget.style.color = "var(--background)";
              }}
              onMouseLeave={(e) => {
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

