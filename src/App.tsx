import { useState } from "react";
import "./style/App.css";
import "./style/index.css"
import Addnewnote from "./components/Addnewnote";
import Notelist from "./components/Notelist";
import Notestatus from "./components/Notestatus";
import Noteheader from "./components/Noteheader";
import {NoteProvider} from "./context/Notescontext";

function App() {
  const [sortby, setsortby] = useState("latest");
  return (
    <NoteProvider>
      <div className="container">
        <Noteheader sortby={sortby} setsortby={setsortby} />
        <div className="note-app">
          <Addnewnote />
          <div className="note-container">
            <Notestatus />
            <Notelist sortby={sortby} />
          </div>
        </div>
      </div>
    </NoteProvider>
  );
}

export default App;
