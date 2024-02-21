const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const { NoteModel } = require("../models/noteModel");

const noteRouter = express.Router();

// creating a note
noteRouter.post("/create", auth, async (req, res) => {
  try {
    const note = new NoteModel(req.body);
    await note.save();
    res.send({ msg: "A new Note Has Been Created" });
  } catch (error) {
    res.send({ error: error });
  } 
});

// reading all notes
noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await NoteModel.find();
    res.send(notes);
  } catch (error) {
    res.send({ msg: "something went wrong" });
  }
});

// update notes
noteRouter.patch("/update/:noteId", auth, async (req, res) => {
  const { noteId } = req.params;
  try {
    await NoteModel.findByIdAndUpdate({ _id: noteId }, req.body);
    res.send({ msg: "Note has been updated" });
  } catch (error) {
    res.send({ error: error });
  }
});

// delete notes
noteRouter.delete("/delete/:noteId", auth, async (req, res) => {
  const { noteId } = req.params;
  try {
    await NoteModel.findByIdAndDelete({ _id: noteId }, req.body);
    res.send({ msg: "Note has been Deleted" });
  } catch (error) {
    res.send({ error: error });
  }
});

module.exports = {
  noteRouter,
};
