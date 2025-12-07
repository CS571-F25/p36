import { Card } from "react-bootstrap";

interface FlashcardProps {
  frontText: string;
  backText: string;
  isFlipped: boolean;
  onFlip: () => void;
}

export default function Flashcard({ frontText, backText, isFlipped, onFlip }: FlashcardProps) {
  return (
    <Card
      onClick={onFlip}
      role="button"
      tabIndex={0}
      aria-label={isFlipped ? "Flashcard back side" : "Flashcard front side"}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
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
        backgroundColor: isFlipped
          ? "var(--twilight-indigo)"
          : "var(--background)",
        color: isFlipped ? "var(--background)" : "var(--ink-black)",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
        e.currentTarget.style.outline = "3px solid var(--strawberry-red)";
        e.currentTarget.style.outlineOffset = "3px";
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
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
