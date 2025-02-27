
import Massage from "./Massage";

function Notestatus({notes}) {

  if (!notes)
    return (
      <Massage>
        <h2>not note</h2>
      </Massage>
    );
  // const compeletNote = notes.filter((n) => n.compeleted).length;
  // const unCompeletNote = notes.filter((n) => !n.compeleted).length;

  return (
    <ul className="note-status">
      <li>
        All <span>{notes.length}</span>
      </li>
      <li>
        Compelet <span>{`vvd`}</span>
      </li>
      <li>
        unCompelet <span>{`vfvbf`}</span>
      </li>
    </ul>
  );
}

export default Notestatus;
