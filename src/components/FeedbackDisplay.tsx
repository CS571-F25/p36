interface FeedbackDisplayProps {
  isCorrect: boolean;
  definition: string;
}

export default function FeedbackDisplay({
  isCorrect,
  definition,
}: FeedbackDisplayProps) {
  return (
    <div
      style={{
        padding: "1.5rem",
        borderRadius: "0.5rem",
        backgroundColor: isCorrect
          ? "rgba(101, 204, 138, 0.15)"
          : "rgba(0, 0, 0, 0.1)",
        border: `2px solid ${
          isCorrect ? "var(--success-green)" : "var(--ink-black)"
        }`,
        boxShadow: isCorrect
          ? "none"
          : "0 4px 8px rgba(0, 0, 0, 0.2)",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "2rem",
          marginBottom: "0.5rem",
        }}
      >
        {isCorrect ? "✓" : "✗"}
      </div>
      <p
        style={{
          color: isCorrect ? "var(--success-green)" : "var(--ink-black)",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        {isCorrect ? "Correct!" : "Incorrect"}
      </p>
      <p style={{ color: "var(--ink-black)", marginBottom: 0 }}>
        <strong>Definition:</strong> {definition}
      </p>
    </div>
  );
}

