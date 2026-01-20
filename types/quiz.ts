import type { Flower } from "./flower";

export type QuizMode =
    | "image-to-names"
    | "name-to-images"
    | "prices"
    | "spelling"
    | "matcher"
    | "swipes"
    | "select-pair"
    | "catalog";

export interface MultipleChoiceState {
    options: Flower[];
    selectedId: string | null;
    wrongIds: string[];
    isCorrect: boolean | null;
    handleSelect: (id: string) => void;
}

export interface SpellingState {
    letters: string[];
    input: string[];
    isShaking: boolean;
    isError: boolean;
    handleLetterClick: (letter: string, index: number) => void;
    handleRemoveLetter: (index: number) => void;
}

export interface MatcherState {
    target: { id: string; name: string } | null;
    board: { id: string; img: string }[];
    clearedIds: string[];
    handleMatchClick: (id: string) => void;
}

export interface SwipeState {
    swipeLabel: string;
    handleSwipe: (direction: "left" | "right") => void;
}

export interface PairState {
    leftOptions: { id: string; name: string }[];
    rightOptions: { id: string; price: string }[];
    leftId: string | null;
    rightId: string | null;
    clearedIds: string[];
    isShaking: boolean;
    handleSelect: (side: "left" | "right", id: string) => void;
}
