import { useState } from "react";
import "./style/App.css";
import "./style/index.css";
import Addnewnote from "./components/Addnewnote";
import Notelist from "./components/Notelist";
import Notestatus from "./components/Notestatus";
import Noteheader from "./components/Noteheader";

function App() {
  const [notes, setnote] = useState([]);
  const [sortby, setsortby] = useState("latest");
  const handelDelete = (id) => {
    setnote(notes.filter((note) => note.id !== id));
  };
  const handelEdit = (id) => {
    setnote(
      notes.map((note) =>
        note.id === id ? { ...note, compeleted: !note.compeleted } : note
      )
    );
  };
  const handelSort = (e)=> {
    setsortby(e.target.value)
  }

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
  const sortNote = notes.sort(handelSortNote);

  return (
    <div className="container">
      <Noteheader notes={sortNote} sortby={sortby} onsort={handelSort} />
      <div className="note-app">
        <Addnewnote setnote={setnote} />
        <div className="note-container">
          <Notestatus notes={sortNote} />
          <Notelist
            notes={sortNote}
            handelEdit={handelEdit}
            handelDelete={handelDelete}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
