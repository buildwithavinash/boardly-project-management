import { BiSort } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

const TaskFilters = ({
  role,
  currentFilter,
  setCurrentFilter,
  openDropdown,
  setOpenDropdown,
  priorityFilter,
  setPriorityFilter,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* filters */}
      <div className="">
        {/* all tasks and my tasks  */}
        {role === "member" && (
          <select
            value={currentFilter}
            onChange={(e) => setCurrentFilter(e.target.value)}
            className="border border-primary/30 outline-none rounded-lg text-slate-800 px-2"
          >
            <option value="all">All tasks</option>
            <option value="mine">My tasks</option>
          </select>
        )}
      </div>

      <div className="flex gap-2 justify-end">
        {/* sort by status */}
        <div className="relative bg-slate-200 p-1 rounded-lg flex justify-between items-center">
          {/* trigger button */}
          <button
            onClick={(e) => {
              setOpenDropdown(openDropdown === "status" ? null : "status");
              e.stopPropagation();
            }}
            className="cursor-pointer"
          >
            <CiFilter />
          </button>

          {/* dropdown menu */}
          {openDropdown === "status" && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-36">
              {["all", "pending", "inProgress", "done"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setStatusFilter(option);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50
                            ${statusFilter === option ? "text-primary font-medium" : "text-slate-600"}`}
                >
                  {option === "all" ? "All Status" : option}
                </button>
              ))}
            </div>
          )}
        </div>
        {/* sort by priority */}
        <div className="relative bg-slate-200 p-1 rounded-lg flex justify-between items-center cursor-pointer">
          {/* trigger button */}
          <button
            onClick={(e) => {
              setOpenDropdown(openDropdown === "priority" ? null : "priority");
              e.stopPropagation();
            }}
            className="cursor-pointer"
          >
            <BiSort />
          </button>

          {/* dropdown menu */}
          {openDropdown === "priority" && (
            <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-36">
              {["all", "low", "medium", "high"].map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setPriorityFilter(option);
                    setOpenDropdown(null);
                  }}
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50
                            ${priorityFilter === option ? "text-primary font-medium" : "text-slate-600"}`}
                >
                  {option === "all" ? "All" : option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
