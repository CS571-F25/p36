import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { nanoid } from "nanoid";

export type Flashcard = {
  term: string;
  definition: string;
  status?: "Unsure" | "Learning" | "Mastered";
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
  getSet: (id?: string) => FlashcardSet | undefined;
  createSet: (name: string, cards: Flashcard[]) => string;
  deleteSet: (id: string) => void;
  updateCardStatus: (
    setId: string,
    cardIndex: number,
    status: "Unsure" | "Learning" | "Mastered",
  ) => void;
};

export const useStore = create<State & Action>()(
  persist(
    (set, get) => ({
      sets: [],
      getSet: (id) =>
        id ? get().sets.find((state) => state.id === id) : undefined,
      createSet(name, cards) {
        const id = nanoid();
        set((state) => ({ sets: [...state.sets, { id, name, cards }] }));
        return id;
      },
      deleteSet(id) {
        set((state) => ({ sets: state.sets.filter((set) => set.id !== id) }));
      },
      updateCardStatus(setId, cardIndex, status) {
        set((state) => ({
          sets: state.sets.map((s) => {
            if (s.id !== setId) return s;
            // guard for out-of-range index
            if (cardIndex < 0 || cardIndex >= s.cards.length) return s;
            const updatedCards = s.cards.map((c, idx) =>
              idx === cardIndex ? { ...c, status } : c,
            );
            return { ...s, cards: updatedCards };
          }),
        }));
      },
    }),
    {
      name: "recall",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
