import { Trash2Icon } from "lucide-react";
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const TaskCard = ({ task, setTasks }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      toast.success("task deleted successfully!");
    } catch (error) {
      console.log("error in handleDelete", error);
      toast.error("Failed to delete task");
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const res = await api.put(`/tasks/${id}`, { completed: !currentStatus });
      setTasks((prev) => prev.map((t) => (t._id === id ? res.data : t)));
    } catch (error) {
      console.log("error in handleToggleComplete", error);
      toast.error("Failed to update task");
    }
  };

 
//     <div
//       className="card bg-base-100 hover:shadow-lg transition-all duration-200
//       border-t-4 border-solid border-secondary"
//     >
//       <div className="card-body">
//         <div className="flex items-start gap-3">
//           <input
//             type="checkbox"
//             className="checkbox checkbox-primary mt-1"
//             checked={task.completed}
//             onChange={() => handleToggleComplete(task._id, task.completed)}
//           />
//           <h3
//             className={`card-title text-base-content ${
//               task.completed ? "line-through text-base-content/40" : ""
//             }`}
//           >
//             {task.title}
//           </h3>
//         </div>

//         <div className="card-actions justify-between items-center mt-4">
//           <span className="text-sm text-base-content/60">
//             {task.dueDate ? formatDate(task.dueDate) : "No due date"}
//           </span>
//           <button
//             className="btn btn-ghost btn-xs text-error"
//             onClick={(e) => handleDelete(e, task._id)}
//           >
//             <Trash2Icon className="size-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
return (
  <li className="flex items-center gap-4 px-6 py-5 border-b border-base-content/10">

    {/* Checkbox */}
    <input
      type="checkbox"
      className="checkbox checkbox-secondary"
      checked={task.completed}
      onChange={() =>
        handleToggleComplete(task._id, task.completed)
      }
    />

    {/* Task details */}
    <div className="flex-1 min-w-0">
      <div
        className={`text-xl font-bold text-base-content ${
          task.completed
            ? "line-through text-base-content/40"
            : ""
        }`}
      >
        {task.title}
      </div>

      <div className="text-sm text-base-content/60 mt-1">
        {task.dueDate
          ? `Due: ${formatDate(task.dueDate)}`
          : "No due date"}
      </div>
    </div>

    {/* Delete */}
    <button
      className="btn btn-ghost btn-sm text-error"
      onClick={(e) => handleDelete(e, task._id)}
    >
      <Trash2Icon className="size-5" />
    </button>

  </li>
);

};
export default TaskCard;
