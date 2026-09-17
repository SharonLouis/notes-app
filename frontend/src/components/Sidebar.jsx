import { NavLink } from "react-router";
import { LayoutDashboard, FileText, CheckSquare, Bookmark } from "lucide-react";

const Sidebar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-btn text-base transition-colors ${
      isActive
        ? "bg-primary/10 text-primary font-semibold"
        : "text-base-content/70 hover:text-base-content hover:bg-base-300"
    }`;

  return (
    <aside className="w-60 h-screen bg-base-200 p-4">
      <h1 className="text-xl font-bold px-4 mb-6">
        <span className="text-base-content">Note</span>
        <span className="text-primary">Stack.</span>
      </h1>

      <ul className="menu p-0 gap-1">
        <li>
          <NavLink to="/dashboard" className={linkStyle}>
            <LayoutDashboard className="size-5" />
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={linkStyle}>
            <FileText className="size-5" />
            Notes
          </NavLink>
        </li>
        <li>
          <NavLink to="/taskpage" className={linkStyle}>
            <CheckSquare className="size-5" />
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/bookmarks" className={linkStyle}>
            <Bookmark className="size-5" />
            Bookmarks
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;