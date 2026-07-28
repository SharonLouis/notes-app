import express from "express";
import {createNote, deleteNote, getAllNotes, updateNote,getById} from "../Controller/controller.js";

const router = express.Router();


router.get("/",getAllNotes);
router.get("/:id",getById);

router.post("/",createNote);

router.put("/:id",updateNote);
router.delete("/:id",deleteNote);
export default router ;