import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";

const TaskDetailPage = () => {
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/tasks/${id}`);
        setTask(res.data);
      } catch (error) {
        console.log("Error in fetching task", error);
        toast.error("Failed to fetch the task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      toast.success("Task deleted");
      navigate("/taskpage");
    } catch (error) {
      console.log("Error deleting the task:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleSave = async () => {
    if (!task.title.trim()) {
      toast.error("Please add a title");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/tasks/${id}`, task);
      toast.success("Task updated successfully");
      navigate("/taskpage");
    } catch (error) {
      console.log("Error saving the task:", error);
      toast.error("Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/taskpage")}
            className="btn btn-ghost"
          >
            <ArrowLeftIcon className="size-5" />
            Back to Tasks
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-error btn-outline"
          >
            <Trash2Icon className="size-5" />
            Delete Task
          </button>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Task Title"
                className="input input-bordered w-full"
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={task.dueDate ? task.dueDate.slice(0, 10) : ""}
                onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              />
            </div>

            <div className="form-control mb-6">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={task.completed}
                  onChange={(e) =>
                    setTask({ ...task, completed: e.target.checked })
                  }
                />
                <span className="label-text">Mark as completed</span>
              </label>
            </div>

            <div className="card-actions justify-end">
              <button
                className="btn btn-primary"
                disabled={saving}
                onClick={handleSave}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;