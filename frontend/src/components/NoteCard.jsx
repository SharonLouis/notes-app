import { Link } from "react-router-dom";
import { PenSquareIcon, Trash2Icon , BookmarkIcon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async(e, id) => {
    e.preventDefault(); 
    if(!window.confirm("Are you sure you want to delete this note?"))
      return;
    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev)=> prev.filter((note)=>note._id!==id));
      toast.success("note deleted successfully!");
    } catch (error) {
      console.log("error in handleDelete",error);
      toast.error("Failed to delete note");
    }  };

  const handleToggleBookmark = async(id ,currentStatus)=>{
    try{
    const res = await api.put(`/notes/${id}`,{isBookmarked:!currentStatus});
    setNotes((prev)=>prev.map((t)=>(t._id === id? res.data: t)));
    }catch(error){
    console.log("error in handleToggleBookmark", error);
    toast.error("Failed to bookmark a note");
  }

  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="card bg-base-100 hover:shadow-lg transition-all duration-200
      border-t-4 border-solid border-secondary"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span> 
      <div className="flex items-center gap-1">
  <PenSquareIcon className="size-4" />
  <button
    className="btn btn-ghost btn-xs"
    onClick={(e) => {
      e.preventDefault();
      handleToggleBookmark(note._id, note.isBookmarked);
    }}
  >
    <BookmarkIcon
      className={note.isBookmarked ? "text-primary size-4" : "text-base-content/40 size-4"}
      fill={note.isBookmarked ? "currentColor" : "none"}
    />
  </button>
  <button
    className="btn btn-ghost btn-xs text-error"
    onClick={(e) => handleDelete(e, note._id)}
  >
    <Trash2Icon className="size-4" />
  </button>
</div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;