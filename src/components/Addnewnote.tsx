import {useContext, useState} from "react";
import {DispatchContext} from "../context/Notescontext";

function Addnewnote() {
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const dispatch = useContext(DispatchContext);
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
    e.preventDefault();

    if (!title || !description) return;

    const newNote = {
      title: title,
      description: description,
      id: Date.now(),
      compeleted: false,
      createdAt: new Date().toISOString(),
    };
    setTitle("");
    setdescription("");
    dispatch({type: "add", payload: newNote});
  };
  return (
    <div className="add-new-note">
      <h2>Add new note</h2>
      <form className="note-form" onSubmit={handelSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="text-field"
          placeholder="note title"
        />
        <input
          value={description}
          onChange={(e) => setdescription(e.target.value)}
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
