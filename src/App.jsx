import {useState} from "react";
import "./style/App.css";
import "./style/index.css";
import Addnewnote from "./components/Addnewnote";
import Notelist from "./components/Notelist";
import Notestatus from "./components/Notestatus";
import Noteheader from "./components/Noteheader";

function App() {
  const [notes, setnote] = useState([]);
  const handelDelete = (id) => {
    setnote(notes.filter((note) => note.id !== id));
  };
  // const handelcompelet = (id) => {
  //   // console.log(id);
  //   // setnotes((prevnotes) =>
  //   //   prevnotes.map((note) => (note.id === id ? {...note, compeleted: !note.compeleted} : note))
  //   // );
  //   dispatch({type: "compelete", payload: id});
  // };

  return (
    <div className="container">
      <Noteheader notes={notes}  />
      <div className="note-app">
        <Addnewnote notes={notes} setnote={setnote} />
        <div className="note-container">
          <Notestatus notes={notes} />
          <Notelist notes={notes} handelDelete={handelDelete} />
        </div>
      </div>
    </div>
  );
}

export default App;
