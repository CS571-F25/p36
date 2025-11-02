import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Flashcard = {
  term: string;
  definition: string;
};

type FlashcardSet = {
  id: string;
  name: string;
  cards: Flashcard[];
};

type State = {
  sets: FlashcardSet[];
};

const useStore = create<State>()(
  persist(
    (get, set) => ({
      sets: [],
    }),
    {
      name: "recall",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useStore;
