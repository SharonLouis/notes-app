import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from "../lib/axios";
import toast from "react-hot-toast"

const CreateTaskPage =()=>{
  const [title, setTitle] = useState("");

  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await api.post("/tasks", {
        title,
        completed,
        dueDate
      });

      toast.success("task created successfully!");
      navigate("/taskpage");
    } catch (error) {
      console.log("Error creating task", error);
      if (error.response?.status === 429) {
        toast.error("Slow down! You're creating tasks too fast", {
          duration: 4000,
          icon: "💀",
        });
      } else {
        toast.error("Failed to create task");
      }
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto max-w-2xl px-4 py-8">
        <button
          onClick={() => navigate("/taskpage")}
          className="flex items-center gap-2 text-base-content mb-6"
        >
          Back to Tasks
        </button>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4">Create New Task</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Task Title"
                  className="input input-bordered w-full"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Due Date</span>
                </label>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              <div className="form-control mb-6">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                  <span className="label-text">Mark as completed</span>
                </label>
              </div>

              <div className="card-actions justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskPage