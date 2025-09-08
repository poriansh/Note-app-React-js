import { useContext } from "react";
import { NoteContext } from "../context/Notescontext";

type NoteheaderProps = {
  setsortby: (value: string) => void;
  sortby: string;
};

function Noteheader({ setsortby, sortby } : NoteheaderProps) {
  const notes = useContext(NoteContext)

  return (
    <div className="note-header">
      <h2>My  Note({notes.length})</h2>
      <select value={sortby} onChange={(e) => setsortby(e.target.value)}>
        <option value="latest">latest Note</option>
        <option value="earliest">earliest Note</option>
        <option value="compeleted">compeleted Note</option>
      </select>
    </div>
  );
}

export default Noteheader;
