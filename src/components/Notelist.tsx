import {useContext} from "react";
import Massage from "./Massage";
import {DispatchContext, type Note, NoteContext} from "../context/Notescontext";

type NoteListProps = {
  sortby: string;
};

function Notelist({sortby}: NoteListProps) {
  const notes = useContext(NoteContext);
  const handelSortNote = (a: Note, b: Note) => {
    switch (sortby) {
      case "latest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "earliest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "compeleted":
        return Number(a.compeleted) - Number(b.compeleted);
      default:
        return 0;
    }
  };
  const Sortnotes = [...notes].sort(handelSortNote);
  if (!Sortnotes.length)
    return (
      <Massage>
        <h2>not note</h2>
      </Massage>
    );
  return (
    <div className="note-list">
      {Sortnotes.map((item: Note) => (
        <Noteitem key={item.id} note={item} />
      ))}
    </div>
  );
}

export default Notelist;

function Noteitem({note}: {note: Note}) {
  const dispatch = useContext(DispatchContext);
  return (
    <div
      className={`note-item ${note.compeleted ? "completed" : ""}`}
      data-testid="note-item"
    >
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => dispatch({type: "Delete", payload: note.id})}>
            ❌
          </button>
          <input
            onChange={() => dispatch({type: "completed", payload: note.id})}
            type="checkbox"
          />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}
