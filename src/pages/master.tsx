import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";

import { useStore, type Flashcard as FlashcardType } from "../store";

type FeedbackType = "correct" | "incorrect" | null;

// Helper: Weighted random selection biased toward lower mastery cards
function getWeightedRandomCard(
  cards: FlashcardType[],
  mastery?: ("Unsure" | "Learning" | "Mastered" | undefined)[],
): number {
  // Get indices of cards that aren't mastered yet using optional local mastery map
  const nonMasteredIndices = cards
    .map((c, i) => i)
    .filter((i) => {
      const status =
        mastery && mastery.length === cards.length ? mastery[i] : undefined;
      return status !== "Mastered";
    });

  if (nonMasteredIndices.length === 0) {
    return -1; // All cards mastered
  }

  // Weight: Mastered = 1, Learning = 3, Unsure = 5 (higher weight = more likely to appear)
  const weights = nonMasteredIndices.map((i) => {
    const status =
      mastery && mastery.length === cards.length ? mastery[i] : undefined;
    if (status === "Mastered") return 1;
    if (status === "Learning") return 3;
    return 5; // Unsure or undefined
  });

  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let j = 0; j < weights.length; j++) {
    random -= weights[j];
    if (random <= 0) {
      return nonMasteredIndices[j];
    }
  }

  return nonMasteredIndices[nonMasteredIndices.length - 1];
}

export function Component() {
  const { id } = useParams();
  const navigate = useNavigate();
  const getSet = useStore((state) => state.getSet);
  const set = getSet(id);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [allMastered, setAllMastered] = useState(false);
  // Local mastery state persisted to localStorage per-set so user can redo later
  const [masteryMap, setMasteryMap] = useState<
    ("Unsure" | "Learning" | "Mastered" | undefined)[]
  >([]);

  // Initialize or update current card when set changes
  useEffect(() => {
    if (!set) return;
    // Initialize local mastery map from localStorage or default
    const key = `mastery_${set.id}`;
    const raw = localStorage.getItem(key);
    let initial: ("Unsure" | "Learning" | "Mastered" | undefined)[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) initial = parsed;
      } catch {
        // Invalid localStorage data, start fresh
      }
    }
    // Ensure length matches number of cards
    if (initial.length !== set.cards.length) {
      initial = Array(set.cards.length).fill(undefined);
    }
    setMasteryMap(initial);
    // Select first random card on load
    const firstCard = getWeightedRandomCard(set.cards, initial);
    if (firstCard === -1) {
      setAllMastered(true);
    } else {
      setCurrentCardIndex(firstCard);
    }
  }, [id, set]);

  // Monitor if all cards are mastered using local masteryMap
  useEffect(() => {
    if (!set) return;
    if (masteryMap.length !== set.cards.length) return;
    const allDone = masteryMap.every((s) => s === "Mastered");
    setAllMastered(allDone);
  }, [masteryMap, set]);

  // Persist masteryMap to localStorage
  useEffect(() => {
    if (!set) return;
    const key = `mastery_${set.id}`;
    localStorage.setItem(key, JSON.stringify(masteryMap));
  }, [masteryMap, set]);

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

  if (allMastered) {
    const handleRedo = () => {
      if (!set) return;
      const key = `mastery_${set.id}`;
      const initial = Array(set.cards.length).fill(undefined);
      setMasteryMap(initial);
      localStorage.setItem(key, JSON.stringify(initial));
      setAllMastered(false);
      setUserInput("");
      setFeedback(null);
      setIsAnswered(false);
      const firstCard = getWeightedRandomCard(set.cards, initial);
      if (firstCard !== -1) setCurrentCardIndex(firstCard);
    };
    return (
      <Container
        style={{
          paddingTop: "4rem",
          paddingBottom: "4rem",
          textAlign: "center",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col>
            <div
              style={{
                fontSize: "5rem",
                marginBottom: "2rem",
              }}
            >
              🎉
            </div>
            <h2
              style={{
                color: "var(--success-green)",
                fontWeight: "bold",
                fontSize: "2.5rem",
                marginBottom: "1rem",
              }}
            >
              All Cards Mastered!
            </h2>
            <p
              style={{
                color: "var(--vintage-grape)",
                fontSize: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              You've successfully mastered all {set.cards.length} cards.
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={() => navigate("/sets")}
                style={{
                  backgroundColor: "var(--success-green)",
                  borderColor: "var(--success-green)",
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                size="lg"
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.opacity = "0.85";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Back to Sets
              </Button>
              <Button
                onClick={handleRedo}
                variant="outline-primary"
                style={{
                  borderColor: "var(--twilight-indigo)",
                  color: "var(--twilight-indigo)",
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                size="lg"
              >
                Redo Mastery
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  const currentCard = set.cards[currentCardIndex];

  const handleSubmitAnswer = () => {
    if (!userInput.trim()) return;

    const correct =
      userInput.toLowerCase().trim() ===
      currentCard.definition.toLowerCase().trim();

    setFeedback(correct ? "correct" : "incorrect");
    setIsAnswered(true);
    // Update local mastery based on correctness
    setMasteryMap((prev) => {
      const next = [...prev];
      const cur = next[currentCardIndex];
      if (correct) {
        // promote: undefined/Unsure -> Learning, Learning -> Mastered
        if (cur === "Learning") next[currentCardIndex] = "Mastered";
        else next[currentCardIndex] = "Learning";
      } else {
        // incorrect => mark as Unsure
        next[currentCardIndex] = "Unsure";
      }
      return next;
    });
  };

  // Skip current card for this turn (do not change mastery)
  const handleSkip = () => {
    setUserInput("");
    setFeedback(null);
    setIsAnswered(false);
    // Pick next random card (avoid immediate repeat)
    const nextCard = getWeightedRandomCard(set.cards, masteryMap);
    if (nextCard === -1) {
      setAllMastered(true);
      return;
    }
    if (nextCard === currentCardIndex) {
      // try once more to avoid repeat
      const alt = getWeightedRandomCard(set.cards, masteryMap);
      if (alt !== -1 && alt !== currentCardIndex) setCurrentCardIndex(alt);
    } else {
      setCurrentCardIndex(nextCard);
    }
  };

  const handleNextAfterAnswer = () => {
    setUserInput("");
    setFeedback(null);
    setIsAnswered(false);
    const nextCard = getWeightedRandomCard(set.cards, masteryMap);
    if (nextCard === -1) {
      setAllMastered(true);
    } else if (nextCard === currentCardIndex) {
      const alt = getWeightedRandomCard(set.cards, masteryMap);
      if (alt !== -1) setCurrentCardIndex(alt);
    } else {
      setCurrentCardIndex(nextCard);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isAnswered) {
      handleSubmitAnswer();
    }
  };

  return (
    <Container style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
      {/* Header with set info */}
      <Row className="mb-4">
        <Col className="text-center">
          <h2
            style={{
              color: "var(--ink-black)",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            {set.name}
          </h2>
          <p style={{ color: "var(--vintage-grape)" }}>
            {masteryMap.filter((c) => c === "Mastered").length} /{" "}
            {set.cards.length} cards mastered
          </p>
        </Col>
      </Row>

      {/* Card Display */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Card
            style={{
              minHeight: "300px",
              border: "2px solid var(--twilight-indigo)",
              borderRadius: "1rem",
              backgroundColor: "var(--background)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card.Body style={{ textAlign: "center", padding: "3rem" }}>
              <p
                style={{
                  color: "var(--vintage-grape)",
                  fontSize: "0.9rem",
                  marginBottom: "1rem",
                  fontWeight: "500",
                }}
              >
                What is the definition of:
              </p>
              <h2
                style={{
                  fontSize: "2rem",
                  fontWeight: "600",
                  color: "var(--ink-black)",
                }}
              >
                {currentCard.term}
              </h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Input Field */}
      <Row className="mb-4">
        <Col md={8} className="mx-auto">
          <Form.Control
            type="text"
            placeholder="Type the definition..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isAnswered}
            style={{
              padding: "1rem",
              fontSize: "1rem",
              borderColor: isAnswered
                ? feedback === "correct"
                  ? "var(--success-green)"
                  : "var(--strawberry-red)"
                : "var(--twilight-indigo)",
              backgroundColor: isAnswered
                ? feedback === "correct"
                  ? "rgba(101, 204, 138, 0.1)"
                  : "rgba(255, 0, 53, 0.1)"
                : "var(--background)",
              color: "var(--ink-black)",
            }}
          />
        </Col>
      </Row>

      {/* Feedback Display */}
      {isAnswered && (
        <Row className="mb-4">
          <Col md={8} className="mx-auto">
            <div
              style={{
                padding: "1.5rem",
                borderRadius: "0.5rem",
                backgroundColor:
                  feedback === "correct"
                    ? "rgba(101, 204, 138, 0.15)"
                    : "rgba(255, 0, 53, 0.15)",
                border: `2px solid ${
                  feedback === "correct"
                    ? "var(--success-green)"
                    : "var(--strawberry-red)"
                }`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "2rem",
                  marginBottom: "0.5rem",
                }}
              >
                {feedback === "correct" ? "✓" : "✗"}
              </div>
              <p
                style={{
                  color:
                    feedback === "correct"
                      ? "var(--success-green)"
                      : "var(--strawberry-red)",
                  fontWeight: "600",
                  marginBottom: "0.5rem",
                }}
              >
                {feedback === "correct" ? "Correct!" : "Incorrect"}
              </p>
              <p style={{ color: "var(--ink-black)", marginBottom: 0 }}>
                <strong>Definition:</strong> {currentCard.definition}
              </p>
            </div>
          </Col>
        </Row>
      )}

      {/* Submit / Skip and Continue Buttons */}
      <Row>
        <Col className="text-center">
          {!isAnswered ? (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={handleSubmitAnswer}
                disabled={!userInput.trim()}
                style={{
                  backgroundColor: "var(--strawberry-red)",
                  borderColor: "var(--strawberry-red)",
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                size="lg"
              >
                Submit
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline-secondary"
                style={{
                  borderColor: "var(--twilight-indigo)",
                  color: "var(--twilight-indigo)",
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
              >
                Skip
              </Button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Button
                onClick={handleNextAfterAnswer}
                style={{
                  backgroundColor:
                    feedback === "correct"
                      ? "var(--success-green)"
                      : "var(--strawberry-red)",
                  borderColor:
                    feedback === "correct"
                      ? "var(--success-green)"
                      : "var(--strawberry-red)",
                  padding: "0.75rem 2rem",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                size="lg"
              >
                Continue
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}
