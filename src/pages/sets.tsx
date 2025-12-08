import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

import { useStore } from "../store";
import SetCard from "../components/SetCard";
import CreateSetCard from "../components/CreateSetCard";

export function Component() {
  const sets = useStore((state) => state.sets);
  const deleteSet = useStore((state) => state.deleteSet);
  const navigate = useNavigate();

  const handleCreateSet = () => {
    navigate("/sets/new");
  };

  const handleSetClick = (setId: string) => {
    navigate(`/sets/${setId}`);
  };

  const handleDeleteSet = (e: React.MouseEvent, setId: string) => {
    e.stopPropagation(); // Prevent card click
    if (window.confirm("Are you sure you want to delete this set?")) {
      deleteSet(setId);
    }
  };

  const handleMasterSet = (e: React.MouseEvent, setId: string) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/master/${setId}`);
  };

  const handleEditSet = (e: React.MouseEvent, setId: string) => {
    e.stopPropagation(); // Prevent card click
    navigate(`/sets/${setId}/edit`);
  };

  return (
    <Container
      style={{
        paddingTop: "clamp(1.5rem, 3vw, 2rem)",
        paddingBottom: "clamp(2rem, 5vw, 4rem)",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
          fontWeight: "bold",
          color: "var(--ink-black)",
          marginBottom: "2rem",
        }}
      >
        Study Sets
      </h1>

      {/* Study Sets Grid */}
      {sets.length > 0 ? (
        <Row>
          {sets.map((set) => (
            <Col key={set.id} md={6} lg={4} className="mb-4">
              <SetCard
                set={set}
                onSetClick={handleSetClick}
                onMasterClick={handleMasterSet}
                onEditClick={handleEditSet}
                onDeleteClick={handleDeleteSet}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <Row>
          <Col className="text-center">
            <p
              style={{
                color: "var(--vintage-grape)",
                fontSize: "1rem",
                fontStyle: "italic",
                marginTop: "2rem",
              }}
            >
              No study sets yet. Create your first set using the button below!
            </p>
          </Col>
        </Row>
      )}

      {/* Create New Set Card */}
      <Row className="mb-4">
        <Col>
          <CreateSetCard onCreateClick={handleCreateSet} />
        </Col>
      </Row>
    </Container>
  );
}
