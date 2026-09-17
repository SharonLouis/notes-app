import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-100 border-b border-base-content/10">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
          <h1 className="text-4xl font-medium font-mono tracking-tight flex items-baseline gap-0.5">
            <span className="text-base-content">Dash</span>
            <span className="text-primary">Board</span>
            <span className="text-primary text-2xl">.</span>
          </h1>
            {/* <p className="text-base-content/60 mt-1"> */}
            <p className="text-lg text-base-content/60 mt-1.5">
              Everything important, at a glance
            </p>
          </div>


          <div className="flex items-center gap-4">
            <Link
              to={"/create"}
              className="btn btn-primary rounded-full gap-1.5 shadow-none"
            >
              <PlusIcon className="size-5" />
              <span>Add Note</span>
            </Link>

            <Link
              to={"/createtask"}
              className="btn btn-primary rounded-full gap-1.5 shadow-none"
            >
              <PlusIcon className="size-5" />
              <span>Add task</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
