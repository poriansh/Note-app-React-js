import { useNote } from "../context/Notescontext";
import Massage from "./Massage";

function Notestatus() {
   const notes = useNote();
  const allNotes = notes.length;
  if (!allNotes)
    return (
      <Massage>
        <h2>not note</h2>
      </Massage>
    );
  const compeletNote = notes.filter((n) => n.compeleted).length;
  const unCompeletNote = notes.filter((n) => !n.compeleted).length;

  return (
    <ul className="note-status">
      <li>
        All <span>{allNotes}</span>
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
