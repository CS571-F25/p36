import * as React from "react";

import type { Flashcard } from "../store";

export function Component() {
  const [flashcards, setFlashcards] = React.useState<Flashcard[]>([]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const term = String(formData.get("term"));
          const definition = String(formData.get("definition"));
          setFlashcards((prev) => [...prev, { term, definition }]);
          e.currentTarget.reset();
        }}
      >
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
        <div>
          <p>{flashcard.term}</p>
          <p>{flashcard.definition}</p>
        </div>
      ))}
    </>
  );
}
