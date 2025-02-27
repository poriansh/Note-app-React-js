import {useState} from "react";

function Addnewnote({setnote}) {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!title || !description) return null;

    const newNote = {
      title: title,
      description: description,
      id: Date.now(),
      compeleted: false,
      createdAt: new Date().toISOString(),
    };
    setTitle("");
    setdescription("");
    setnote((prev) => [...prev, newNote]);
  };
  return (
    <div className="add-new-note">
      <h2>Add new note</h2>
      <form className="note-form" onSubmit={handelSubmit}>
        <input
          value={title}
          onInput={(e) => setTitle(e.target.value)}
          type="text"
          className="text-field"
          placeholder="note title"
        />
        <input
          value={description}
          onInput={(e) => setdescription(e.target.value)}
          type="text"
          className="text-field"
          placeholder="note description"
        />
        <button type="submit" className="btn btn--primary">
          Add new note
        </button>
      </form>
    </div>
  );
}

export default Addnewnote;
