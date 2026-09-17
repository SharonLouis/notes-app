import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard'
import { useEffect } from 'react';
import api from "../lib/axios";
import toast from "react-hot-toast"
import NotesNotFound from '../components/NotesNotFound';
import Sidebar from '../components/Sidebar';
import TaskCard from '../components/TaskCard';
import TasksNotFound from '../components/TasksNotFound';
import {AlertCircle, Clock, NotebookIcon, BookmarkIcon} from 'lucide-react';
const Dashboard = () => {
  const [isRateLimited, setisRateLimited] = useState(false);
  const [task , setTask] = useState([]);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
  
    const fetchNotes = async ()=>{
      try{
        const res = await api.get("/notes");
        console.log(res.data);
        setNotes(res.data)
        setisRateLimited(false)
     
      }catch(error){
        console.log("Error fetching notes");
        console.log(error);
        if(error.response?.status === 429){
          setisRateLimited(true)
        }
        else{
          toast.error("failed to load notes")
        }
      }
      finally{
        setLoading(false);     
       }
    };
        fetchNotes();
       },[]);
    useEffect(()=>{
    const fetchTasks = async () => {
      try{
        const res = await api.get("/tasks")
        console.log(res.data);
        setTask(res.data)
        setisRateLimited(false)
      }catch(error){
        console.log("Error fetching tasks");
        console.log(error);
        if(error.response?.status === 429){
          setisRateLimited(true)
        }
        else{
          toast.error("faled to load tasks")
        }
      }
      finally{
        setLoading(false);
      
    }
  };
    fetchTasks();
  },[]);
const dueTasks = task.filter((t)=>{
  const today = new Date();
  today.setHours(0,0,0,0);
  const due = new Date(t.dueDate);
  due.setHours(0,0,0,0)
  return !t.completed && due<=today;


});
const upcomingTasks = task.filter((t)=>{
  const today = new Date();
  today.setHours(0,0,0,0);
  const due = new Date(t.dueDate);
  due.setHours(0,0,0,0)
  return !t.completed && due>today;
}
);
const bookmarkedNotes = notes.filter((note )=> note.isBookmarked);
  return (
    <div className="min-h-screen flex">
    <Sidebar/>
    <div className="flex-1 flex flex-col">
    <Navbar/>

  <div className="grid grid-cols-3 max-w-3xl mb-10 px-4 mt-6">
  <div>
    <p className="flex items-center gap-1.5 text-sm text-base-content/60 mb-1.5">
      <NotebookIcon className="size-4" />
      Notes
    </p>
    <p className="text-4xl font-bold">{notes.length}</p>
  </div>
  <div>
    <p className="flex items-center gap-1.5 text-sm text-base-content/60 mb-1.5">
      <AlertCircle className="size-4" />
      Tasks due
    </p>
    <p className="text-4xl font-bold">{dueTasks.length}</p>
  </div>
  <div>
    <p className="flex items-center gap-1.5 text-sm text-base-content/60 mb-1.5">
      <BookmarkIcon className="size-4" />
      Bookmarks
    </p>
    <p className="text-4xl font-bold">{bookmarkedNotes.length}</p>
  </div>
</div>

    {isRateLimited && <RateLimitedUI/>}
    <div className="max-w-7xl mx-auto p-4 mt-6">
      {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
    {bookmarkedNotes.length > 0 && !isRateLimited &&(
  <div>
    <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
      <BookmarkIcon className="size-5 text-primary" fill="currentColor" />
      Bookmarked notes
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookmarkedNotes.map((note)=>(
        <NoteCard key = {note._id} note ={note} setNotes={setNotes}/>
      ))}
      </div>
  </div>
)}
    {dueTasks.length > 0 && (
  <div className="mt-10">
    <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
      <AlertCircle className="size-5 text-error" />
      Due Tasks
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {dueTasks.map((t) => (
        <TaskCard key={t._id} task={t} setTasks={setTask} />
      ))}
    </div>
  </div>
)}
  {upcomingTasks.length > 0 && (
  <div className="mt-10">
    <h2 className="flex items-center gap-2 text-xl font-bold mb-4">
      <Clock className="size-5 text-base-content/50" />
      Upcoming Tasks
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {upcomingTasks.map((t) => (
        <TaskCard key={t._id} task={t} setTasks={setTask} />
      ))}
    </div>
  </div>
)}
    </div>
    </div>
    </div>

  );
};

export default Dashboard
