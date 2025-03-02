import Massage from "./Massage";

function Notelist({ notes, handelDelete,handelEdit }) {
   if (!notes.length)
     return (
       <Massage>
         <h2>not note</h2>
       </Massage>
     );
  return (
    <div className="note-list">
      {notes.map((item) => (
        <Noteitem key={item.id} handelEdit={handelEdit} handelDelete={handelDelete} note={item} />
      ))}
    </div>
  );
}

export default Notelist;

function Noteitem({note, handelDelete,handelEdit}) {
  return (
    <div className={`note-item ${note.compeleted ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button onClick={() => handelDelete(note.id)}>❌</button>
          <input onChange={() => handelEdit(note.id)} type="checkbox" />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}
