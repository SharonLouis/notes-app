import React, { useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI';
import NoteCard from '../components/NoteCard'
import { useEffect } from 'react';
import api from "../lib/axios";
import toast from "react-hot-toast"
import Sidebar from '../components/Sidebar';
import NotesNotFound from '../components/NotesNotFound';

const BookmarksPage = () => {
  const [isRateLimited, setisRateLimited] = useState(false);


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
const bookmarkedNotes = notes.filter((note) => note.isBookmarked);
  return (
    <div className="min-h-screen flex">

    <Sidebar/>
    <div className="flex-1 flex flex-col">


    {isRateLimited && <RateLimitedUI/>}
    <div className="max-w-7xl mx-auto p-4 mt-6 w-full">
      <h1 className="text-3xl font-bold text-base-content mb-6">My Bookmarks</h1>

      {loading && <div className="text-center text-primary py-10">Loading notes...</div>}
      {bookmarkedNotes.length === 0 && !isRateLimited && !loading && <NotesNotFound />}

      {bookmarkedNotes.length > 0 && !isRateLimited && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedNotes.map((note) => (
            <NoteCard key={note._id} note={note} setNotes={setNotes} />
          ))}
        </div>
      )}
    </div>
    </div>
    </div>

  );
};

export default BookmarksPage