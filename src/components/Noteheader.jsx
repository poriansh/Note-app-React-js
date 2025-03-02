

function Noteheader({ onsort,sortby,notes}) {

  return (
    <div className="note-header">
      <h2>My Note({notes.length})</h2>
      <select value={sortby} onChange={onsort}>
        <option value="latest">latest Note</option>
        <option value="earliest">earliest Note</option>
        <option value="compeleted">compeleted Note</option>
      </select>
    </div>
  );
}

export default Noteheader;
