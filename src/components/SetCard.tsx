import { Card, Button } from "react-bootstrap";
import { FaTrash, FaGraduationCap, FaEdit } from "react-icons/fa";
import type { FlashcardSet } from "../store";

interface SetCardProps {
  set: FlashcardSet;
  onSetClick: (setId: string) => void;
  onMasterClick: (e: React.MouseEvent, setId: string) => void;
  onEditClick: (e: React.MouseEvent, setId: string) => void;
  onDeleteClick: (e: React.MouseEvent, setId: string) => void;
}

export default function SetCard({
  set,
  onSetClick,
  onMasterClick,
  onEditClick,
  onDeleteClick,
}: SetCardProps) {
  return (
    <Card
      onClick={() => onSetClick(set.id)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${set.name} study set`}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSetClick(set.id);
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
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
      onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.outline = "2px solid var(--ink-black)";
        e.currentTarget.style.outlineOffset = "2px";
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.outline = "none";
      }}
    >
      <Card.Body>
        {/* Master, Edit, and Delete buttons */}
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
            onClick={(e) => onMasterClick(e, set.id)}
            aria-label="Master this set"
            style={{
              padding: "0.25rem 0.5rem",
              backgroundColor: "var(--ink-black)",
              color: "var(--background)",
              textDecoration: "none",
              lineHeight: "1",
              borderRadius: "0.25rem",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = "var(--background)";
              e.currentTarget.style.color = "var(--ink-black)";
              e.currentTarget.style.border = "1px solid var(--ink-black)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.currentTarget.style.backgroundColor = "var(--ink-black)";
              e.currentTarget.style.color = "var(--background)";
              e.currentTarget.style.border = "none";
            }}
          >
            <FaGraduationCap size={18} />
          </Button>
          <Button
            variant="link"
            onClick={(e) => onEditClick(e, set.id)}
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
            onClick={(e) => onDeleteClick(e, set.id)}
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
            paddingRight: "6rem", // Add padding to prevent overlap with buttons
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
  );
}

