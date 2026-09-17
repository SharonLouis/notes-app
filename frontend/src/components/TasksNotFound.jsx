import { CheckSquareIcon } from "lucide-react";
import { Link } from "react-router";

const TasksNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div className="bg-primary/10 rounded-full p-8">
        <CheckSquareIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No tasks yet</h3>
      <p className="text-base-content/70">
        Stay on top of things — add your first task to get started.
      </p>
      <Link to="/create-task" className="btn btn-primary">
        Create Your First Task
      </Link>
    </div>
  );
};
export default TasksNotFound;
