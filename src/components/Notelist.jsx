function Notelist({notes}) {
  return (
    <div className="note-list">
      {notes.map((item) => (
        <Noteitem key={item.id} note={item} />
      ))}
    </div>
  );
}

export default Notelist;

function Noteitem({note}) {
  return (
    <div className={`note-item ${note.compeleted ? "completed" : ""}`}>
      <div className="note-item__header">
        <div>
          <p className="title">{note.title}</p>
          <p className="desc">{note.description}</p>
        </div>
        <div className="actions">
          <button>❌</button>
          <input type="checkbox" />
        </div>
      </div>
      <div className="note-item__footer">
        {new Date(note.createdAt).toLocaleDateString("fa-IR")}
      </div>
    </div>
  );
}
