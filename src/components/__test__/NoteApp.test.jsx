import {fireEvent, render, screen} from "@testing-library/react";
import {expect, test} from "vitest";
import Addnewnote from "../Addnewnote";
import Notestatus from "../Notestatus";
import Notelist from "../Notelist";
import {NoteProvider} from "../../context/Notescontext";

function addNote(notes) {
  const inputTitle = screen.getByPlaceholderText(/note title/);
  const inputdiscription = screen.getByPlaceholderText(/note description/);
  const ButtonElem = screen.getByRole("button", {name: "Add new note"});

  notes.forEach((note) => {
    fireEvent.change(inputTitle, {target: {value: note.title}});
    fireEvent.change(inputdiscription, {target:{ value : note.description}});
    fireEvent.click(ButtonElem);
  });
}

test("Note app #1 : input the empty after submit", () => {
  render(
    <NoteProvider>
      <div className="note-app">
        <Addnewnote />
        <div className="note-container">
          <Notestatus />
          <Notelist sortby="latest" />
        </div>
      </div>
    </NoteProvider>
  );
  screen.debug();

  addNote([{title: "note one title", description: "note one des"}]);
  const inputTitle = screen.getByPlaceholderText(/note title/);
  expect(inputTitle.value).toBe("");
});

test("Note app #2 : add note list after submit", () => {
  render(
    <NoteProvider>
      <div className="note-app">
        <Addnewnote />
        <div className="note-container">
          <Notestatus />
          <Notelist sortby="latest" />
        </div>
      </div>
    </NoteProvider>
  );
  screen.debug();
  addNote([{title: "note one title", description: "note one des"}]);

  const divElem = screen.getByText(/note one title/);

  expect(divElem).toBeInTheDocument();
});

test("Note app #3 : add class completed after checked", () => {
  render(
    <NoteProvider>
      <div className="note-app">
        <Addnewnote />
        <div className="note-container">
          <Notestatus />
          <Notelist sortby="latest" />
        </div>
      </div>
    </NoteProvider>
  );
  screen.debug();
    addNote([{ title: "note one title", description: "note one des" }]);
    
  const checkbox = screen.getByRole("checkbox");
  fireEvent.click(checkbox);
  const divElem = screen.getByTestId("note-item");
  expect(divElem).toHaveClass("completed");
});
