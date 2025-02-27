import {useState} from "react";
import "./style/App.css";
import Addnewnote from "./components/Addnewnote";
import Notelist from "./components/Notelist";
import Notestatus from "./components/Notestatus";
import Noteheader from "./components/Noteheader";

function App() {
  const [sortby, setsortby] = useState("latest");
  const [notes, setnote] = useState([]);
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
    <div className="container">
      <Noteheader sortby={sortby} notes={notes} onsort={(e) => setsortby(e.target.value)} />
      <div className="note-app">
        <Addnewnote notes={notes} setnote={setnote} />
        <div className="note-container">
          <Notestatus notes={notes} />
          <Notelist notes={notes} />
        </div>
      </div>
    </div>
  );
}

export default App;
