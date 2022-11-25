const express = require("express");
const router = express.Router();
var fetchUser = require("../middleware/fetchUser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTES:1 GET ALL THE NOTES USING : GET:'/API/NOTES/FETCHALLNOTES' LOGIN REQUIRED
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTES:2 ADD NOTES USING : POST:'/API/NOTES/ADDNOTES' LOGIN REQUIRED
router.post("/addnotes", fetchUser,
  [
    body("title", "Enter a Valid title").isLength({ min: 3 }),
    body("description", "description cannot be blank").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      // if there is an error it will return Bad request//
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Notes({title,description,tag,user: req.user.id,});
      const saveNotes = await note.save();

      res.json([saveNotes]);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

//ROUTES:3 UPDATING AN EXIST NOTES USING : PUT:'/API/NOTES/UPDATENOTES/ID:' LOGIN REQUIRED
router.put("/updatenotes/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    //CREATING A NEWNODE OBJECT//
    const newNode = {};
    if (title) {
      newNode.title = title;
    }
    if (description) {
      newNode.description = description;
    }
    if (tag) {
      newNode.tag = tag;
    }

    // FIND THE NOTE TO UPDATED AND UPDATE IT//

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{ $set: newNode },{ new: true });
    res.json({ note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//ROUTES:4 DELETING AN EXIST NOTES USING : PUT:'/API/NOTES/DELETENOTES/ID:' LOGIN REQUIRED
router.delete("/deletenotes/:id", fetchUser, async (req, res) => {
  try {

    // FIND THE NOTE TO DELETE AND DELETE IT//

    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    // ALLOW DELETION ONLY IF USER OWNS THIS//
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted"});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;
