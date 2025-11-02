import { Link } from "react-router";
import useStore from "../store";

export function Component() {
  const sets = useStore((state) => state.sets);

  return (
    <>
      {sets.length ? (
        sets.map((set) => (
          <div id={set.id}>
            <h2>{set.name}</h2>
          </div>
        ))
      ) : (
        <>
          <h2>No study sets</h2>
          <p>Get started by creating a new study set.</p>
          <Link to="/create">Create a Set</Link>
        </>
      )}
    </>
  );
}
