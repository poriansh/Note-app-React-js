import {createContext, useReducer} from "react";

export const NoteContext = createContext();
export const DispatchContext = createContext();

function noteReducer(notes, {type, payload}) {
  switch (type) {
    case "add":
      return [...notes, payload];
    case "Delete":
      return notes.filter((note) => note.id !== payload);
    case "completed":
      return notes.map((note) =>
        note.id === payload ? {...note, compeleted: !note.compeleted} : note
      );
    default:
      throw new Error("error dispatch");
  }
}



export function NoteProvider({children}) {
  const [notes, dispatch] = useReducer(noteReducer, []);
  return (
    <NoteContext.Provider value={notes}>
      <DispatchContext.Provider value={dispatch} >{children}</DispatchContext.Provider>
    </NoteContext.Provider>
  );
}
