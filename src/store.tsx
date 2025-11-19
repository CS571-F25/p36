import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

export type Flashcard = {
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

type Action = {
  getSet: (id: string) => FlashcardSet | undefined;
  createSet: (name: string, cards: Flashcard[]) => string;
};

export const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      sets: [],
      getSet: (id) => get().sets.find((state) => state.id === id),
      createSet(name, cards) {
        const id = nanoid();
        set((state) => ({ sets: [...state.sets, { id, name, cards }] }));
        return id;
      },
    }),
    {
      name: "recall",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
