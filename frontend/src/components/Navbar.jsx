import { Link } from "react-router";
import { PlusIcon } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-base-100 border-b border-base-content/10">
      <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium font-mono tracking-tight flex items-baseline gap-0.5">
            <span className="text-base-content">Note</span>
            <span className="text-primary">Stack</span>
            <span className="text-primary text-xl">.</span>
          </h1>
          <div className="flex items-center gap-4">
            <Link to={"/create"}
              className="btn btn-primary rounded-full gap-1.5 shadow-none"
            >
              <PlusIcon className="size-5" />
              <span>Add Note</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

