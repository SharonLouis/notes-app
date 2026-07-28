import Note from "../models/note.js";
export async function getAllNotes(req,res){
    try{
          const notes = await Note.find().sort({createdAt:1});// newest first sorts in descending order
          res.status(200).json(notes);
    }
    catch(error){
          console.error("error in getAllnotes controller",error);
          res.status(404).json({message:"Internal server error"});
    }
} 
export async function createNote(req,res){
     try{
          const {title,content} = req.body;
          const Newnote = new Note({title,content});
          await Newnote.save();
          res.status(201).json({message:"Note created succesfully!"});
     }
     catch(error){
          console.error("error in createNote controller",error);
          res.status(500).json({message:"Internal server error"});
     }
}

export async function updateNote(req,res){
try{
     const{title,content} = req.body;
     const updatedNote = await Note.findByIdAndUpdate(
          req.params.id,{title,content},{
               new:true // Return the updated document
          });
     if(!updatedNote) return res.status(404).json({message:"note not found"});
     res.status(200).json(updatedNote);
}
catch(error){
     console.error("error in updateNote controll er",error);
     res.status(500).json({message:"Internal server error"});
}}
export async function deleteNote(req,res){
     try {
          
          const deletedNote = await Note.findByIdAndDelete(req.params.id);
          if(!deletedNote) return res.status(404).json({message:"note not found"});
          res.status(200).json(deletedNote);
     }
     catch(error){
          console.error("error in deleteNote controller",error);
          res.status(500).json({message:"Internal server error"});
     }
}         
export async function getById(req,res){
     try{
          const note = await Note.findById(req.params.id);
          if(!note) return res.status(404).json({message:"note not found"});
          res.status(200).json(note);

     }
     catch(error){
          console.log("error in getByid function",error);
          res.status(500).json({message :"Internal server error"});
     }
}