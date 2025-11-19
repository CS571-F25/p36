import { useState } from "react";
import { useParams } from "react-router";

import { useStore } from "../store";

export function Component() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const { id } = useParams();

  const getSet = useStore((state) => state.getSet);

  const set = getSet(id!);

  if (!set) {
    return; // TODO: handle not found set case
  }

  return (
    <>
      <h1>{set.name}</h1>
      <p>
        {currentIdx + 1}/{set.cards.length}
      </p>
      <div onClick={() => setIsFlipped((prev) => !prev)}>
        {isFlipped
          ? set.cards[currentIdx].definition
          : set.cards[currentIdx].term}
      </div>
      <button
        disabled={currentIdx === 0}
        onClick={() => {
          setCurrentIdx((prev) => --prev);
          setIsFlipped(false);
        }}
      >
        Previous
      </button>
      <button
        disabled={currentIdx === set.cards.length - 1}
        onClick={() => {
          setCurrentIdx((prev) => ++prev);
          setIsFlipped(false);
        }}
      >
        Next
      </button>
    </>
  );
}
