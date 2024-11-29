import {useState} from "react";
import "./style/App.css";
import Addnewnote from "./components/Addnewnote";
import Notelist from "./components/Notelist";
import Notestatus from "./components/Notestatus";
import Noteheader from "./components/Noteheader";
import NotesProvider from "./context/Notescontext";

function App() {
  const [sortby, setsortby] = useState("latest");

  // const handelDeletenote = (id) => {
  //   // setnotes((prevnotes) => prevnotes.filter((note) => note.id !== id));

  //   dispatch({type: "Delete", payload: id});
  // };
  // const handelcompelet = (id) => {
  //   // console.log(id);
  //   // setnotes((prevnotes) =>
  //   //   prevnotes.map((note) => (note.id === id ? {...note, compeleted: !note.compeleted} : note))
  //   // );
  //   dispatch({type: "compelete", payload: id});
  // };

  return (
    <NotesProvider>
      <div className="container">
        <Noteheader sortby={sortby} onsort={(e) => setsortby(e.target.value)} />
        <div className="note-app">
          <Addnewnote />
          <div className="note-container">
            <Notestatus />
            <Notelist sortby={sortby} />
          </div>
        </div>
      </div>
    </NotesProvider>
  );
}

export default App;
