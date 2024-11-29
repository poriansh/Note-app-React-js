import { useDispatchNote, useNote } from "../context/Notescontext";

function Notelist({  sortby }) {
  const  notes  = useNote();
  
  let sortedNotes = notes;
  if (sortby === "earliest")
    sortedNotes = [...notes].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  if (sortby === "latest")
    sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (sortby === "compeleted")
    sortedNotes = [...notes].sort((a, b) => Number(a.compeleted) - Number(b.compeleted));
  return (
    <div className="note-list">
      {sortedNotes.map((item) => (
        <Noteitem key={item.id} note={item} />
      ))}
    </div>
  );
}

export default Notelist;

function Noteitem({ note }) {
  const dispatch = useDispatchNote();
  return (
    <div className={`note-item ${note.compeleted ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => dispatch({type: "Delete", payload: note.id})}>❌</button>
          <input onChange={() => dispatch({type: "compelete", payload: note.id})} type="checkbox" />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}
