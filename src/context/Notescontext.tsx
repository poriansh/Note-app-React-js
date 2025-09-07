import React, {createContext, useReducer, type ReactNode} from "react";

export type Note = {
  title: string;
  description: string;
  id: number;
  compeleted: boolean;
  createdAt: string;
};

type Action =
  | {type: "add"; payload: Note}
  | {type: "Delete"; payload: number}
  | {type: "completed"; payload: number};

const NoteContext = createContext<Note[]>([]);
const DispatchContext = createContext<React.Dispatch<Action>>(() => {
  throw new Error("DispatchContext must be used inside Provider");
});

function noteReducer(state: Note[], action: Action): Note[] {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "Delete":
      return state.filter((note) => note.id !== action.payload);
    case "completed":
      return state.map((note) =>
        note.id === action.payload ? {...note, compeleted: !note.compeleted} : note
      );
    default:
      throw new Error("Unknown action");
  }
}

export function NoteProvider({children}: {children: ReactNode}) {
  const [notes, dispatch] = useReducer(noteReducer, []);

  return (
    <NoteContext.Provider value={notes}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </NoteContext.Provider>
  );
}

export {NoteContext, DispatchContext};
