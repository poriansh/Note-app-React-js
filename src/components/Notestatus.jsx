import { useContext } from "react";
import { NoteContext } from "../context/Notescontext";


function Notestatus() {
  const notes = useContext(NoteContext)
  const compeletNote = notes.filter((n) => n.compeleted).length;
  const unCompeletNote = notes.filter((n) => !n.compeleted).length;

  return (
    <ul className="note-status">
      <li>
        All <span>{notes.length}</span>
      </li>
      <li>
        Compelet <span>{compeletNote}</span>
      </li>
      <li>
        unCompelet <span>{unCompeletNote}</span>
      </li>
    </ul>
  );
}

export default Notestatus;
