import Task from "../models/task.js";
import mongoose from "mongoose";
    export async function getAllTasks (req,res){
        try{
              const Tasks = await Task.find().sort({createdAt:-1});// newest first sorts in descending order
              res.status(200).json(Tasks);
        }
        catch(error){
              console.error("error in getAllnotes controller",error);
              res.status(500).json({message:"Internal server error"});
        }
    } 
export async function createTask (req,res){
    try{
        const{title,dueDate}=req.body;
        if(!title||!title.trim()){
            return res.status(400).json({message:"title and content are required"});
        }
        const newTask = new Task({title,dueDate});
        await newTask.save();
        res.status(201).json(newTask);

    }
    catch(error){
        console.error("error in CreateTask",error);
        res.status(500).json({message:"Internal server error"});
    }
}
export async function updateTask(req,res) {
    try{
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message:"Invalid task ID"});
        }
        const{title,completed,dueDate}=req.body;
        if(title!==undefined && !title.trim()){
            return res.status(400).json({message:"title cant be empty"});
        }
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,{title,completed,dueDate},{
                new:true
            });
        if(!updateTask) return res.status(404).json({message:"task not found"});
        res.status(200).json(updateTask);
    }
  
    catch(error){
     console.error("error in updateNote controll er",error);
     res.status(500).json({message:"Internal server error"});
    }
}
export async function deleteTask(req,res){
    try{
            if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({message:"Invalid task ID"});
        }

        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if (!deleteTask) return res.status(404).json({message:"task not found"});
        res.status(200).json(deleteTask);

    }
    catch(error){
        console.error("error in deleteNote controller",error);
        res.status(500).json({message:"Internal server error"});
    }
}
       