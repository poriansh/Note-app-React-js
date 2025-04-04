import {useContext} from "react";
import Massage from "./Massage";
import {DispatchContext, NoteContext} from "../context/Notescontext";

function Notelist({sortby}) {
  const notes = useContext(NoteContext);
  const handelSortNote = (a, b) => {
    switch (sortby) {
      case "latest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "earliest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "compeleted":
        return a.compeleted - b.compeleted;
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
      {Sortnotes.map((item) => (
        <Noteitem key={item.id} note={item} />
      ))}
    </div>
  );
}

export default Notelist;

function Noteitem({note}) {
  const dispatch = useContext(DispatchContext);
  return (
    <div className={`note-item ${note.compeleted ? "completed" : ""}`} data-testid="note-item">
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => dispatch({type: "Delete", payload: note.id})}>❌</button>
          <input onChange={() => dispatch({type: "completed", payload: note.id})} type="checkbox" />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}
