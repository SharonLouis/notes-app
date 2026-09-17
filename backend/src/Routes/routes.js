import express from "express";
import {createNote, deleteNote, getAllNotes, updateNote,getById} from "../Controller/notecontroller.js";
import { createTask,deleteTask,getAllTasks,updateTask } from "../Controller/taskcontroller.js";
const router = express.Router();

//notes
router.get("/notes",getAllNotes);
router.get("/notes/:id",getById);

router.post("/notes",createNote);

router.put("/notes/:id",updateNote);
router.delete("/notes/:id",deleteNote);
//tasks
router.get("/tasks",getAllTasks);
router.post("/tasks",createTask);
router.put("/tasks/:id",updateTask);
router.delete("/tasks/:id",deleteTask);
export default router ;