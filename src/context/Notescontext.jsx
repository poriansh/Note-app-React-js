import {createContext, useContext, useReducer} from "react";

const Notescontext = createContext(null);
const NotesDispatchcontext = createContext(null);

function notereducer(state, {type, payload}) {
  switch (type) {
    case "addnote": {
      return [...state, payload];
    }
    case "Delete": {
      return state.filter((note) => note.id !== payload);
    }
    case "compelete": {
      return state.map((note) =>
        note.id === payload ? {...note, compeleted: !note.compeleted} : note
      );
    }
  }
}


function NotesProvider({children}) {
  const [notes, dispatch] = useReducer(notereducer, []);
  return (
    <Notescontext.Provider value={notes}>
      <NotesDispatchcontext.Provider value={dispatch}>{children}</NotesDispatchcontext.Provider>
    </Notescontext.Provider>
  );
}

export default NotesProvider;

export function useNote() {
  return useContext(Notescontext);
}
export function useDispatchNote() {
  return useContext(NotesDispatchcontext);
}
