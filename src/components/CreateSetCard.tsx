import { Card } from "react-bootstrap";

interface CreateSetCardProps {
  onCreateClick: () => void;
}

export default function CreateSetCard({ onCreateClick }: CreateSetCardProps) {
  return (
    <Card
      onClick={onCreateClick}
      role="button"
      tabIndex={0}
      aria-label="Create new study set"
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCreateClick();
        }
      }}
      style={{
        cursor: "pointer",
        border: "2px dashed var(--cool-steel)",
        backgroundColor: "transparent",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "var(--twilight-indigo)";
        e.currentTarget.style.backgroundColor = "rgba(56, 64, 95, 0.05)";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
      onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "var(--cool-steel)";
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e: React.FocusEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "var(--twilight-indigo)";
        e.currentTarget.style.backgroundColor = "rgba(56, 64, 95, 0.05)";
        e.currentTarget.style.outline = "2px solid var(--ink-black)";
        e.currentTarget.style.outlineOffset = "2px";
        e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
      }}
      onBlur={(e: React.FocusEvent<HTMLDivElement>) => {
        e.currentTarget.style.borderColor = "var(--cool-steel)";
        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.outline = "none";
        e.currentTarget.style.boxShadow = "none";
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
  );
}

