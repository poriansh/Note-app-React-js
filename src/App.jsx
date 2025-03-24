import {useReducer, useState} from "react";
import "./style/App.css";
import "./style/index.css";
import Addnewnote from "./components/Addnewnote";
import Notelist from "./components/Notelist";
import Notestatus from "./components/Notestatus";
import Noteheader from "./components/Noteheader";

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

function App() {
  const [notes, dispatch] = useReducer(noteReducer, []);
  const [sortby, setsortby] = useState("latest");
  const handeAddnotes = (newNote) => {
    dispatch({type: "add", payload: newNote});
  };
  const handelDelete = (id) => {
    // setnote(notes.filter((note) => note.id !== id));
    dispatch({type: "Delete", payload: id});
  };
  const handelEdit = (id) => {
    // setnote(notes.map((note) => (note.id === id ? { ...note, compeleted: !note.compeleted } : note)));
    dispatch({type: "completed", payload: id});
  };

  const handelSortNote = (a, b) => {
    switch (sortby) {
      case "latest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "earliest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case "compeleted":
        return b.compeleted - a.compeleted;
    }
  };
  const sortNote = [...notes].sort(handelSortNote);

  return (
    <div className="container">
      <Noteheader notes={sortNote} sortby={sortby} setsortby={setsortby} />
      <div className="note-app">
        <Addnewnote handeAddnotes={handeAddnotes} />
        <div className="note-container">
          <Notestatus notes={sortNote} />
          <Notelist notes={sortNote} handelEdit={handelEdit} handelDelete={handelDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
