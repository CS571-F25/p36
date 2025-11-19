import * as React from "react";
import { useNavigate } from "react-router";

import { type Flashcard, useStore } from "../store";

export function Component() {
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);

  const createSet = useStore((state) => state.createSet);

  const navigate = useNavigate();

  const createFlashcardSet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name"));
    const id = createSet(name, flashcards);
    navigate(`/sets/${id}`);
  };

  const addFlashcard = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const term = String(formData.get("term"));
    const definition = String(formData.get("definition"));
    setFlashcards((prev) => [...prev, { term, definition }]);
    e.currentTarget.reset();
  };

  const deleteFlashcard = (term: string) => {
    setFlashcards((prev) => prev.filter((card) => card.term !== term));
  };

  return (
    <>
      <form onSubmit={createFlashcardSet}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <button disabled={!flashcards.length} type="submit">
          Create
        </button>
      </form>
      <form onSubmit={addFlashcard}>
        <div>
          <label htmlFor="term">Term</label>
          <input id="term" name="term" type="text" required />
        </div>
        <div>
          <label htmlFor="definition">Definition</label>
          <textarea id="definition" name="definition" required />
        </div>
        <button type="submit">Add Card</button>
      </form>
      {flashcards.map((flashcard) => (
        <div key={flashcard.term}>
          <p>{flashcard.term}</p>
          <p>{flashcard.definition}</p>
          <button onClick={() => deleteFlashcard(flashcard.term)}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
