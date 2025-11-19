import { Link } from "react-router";

import { useStore } from "../store";

export function Component() {
  const sets = useStore((state) => state.sets);

  return (
    <>
      {sets.length ? (
        sets.map((set) => (
          <Link id={set.id} to={`/sets/${set.id}`}>
            <h2>{set.name}</h2>
          </Link>
        ))
      ) : (
        <>
          <h2>No study sets</h2>
          <p>Get started by creating a new study set.</p>
          <Link to="/sets/new">Create a Set</Link>
        </>
      )}
    </>
  );
}
