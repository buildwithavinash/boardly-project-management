import { SlOptionsVertical } from "react-icons/sl";
import { capitalize, formatDate } from "../utils/formatters";
import { LuCalendarClock } from "react-icons/lu";

const TaskCard = ({
  task,
  priorityConfig,
  user,
  handleStatusChange,
  statusConfig,
  role,
  navigate,
}) => {
  return (
    <div className="relative border border-border bg-background p-2 rounded-lg">
      <div className="leading-tight">
        <h2 className="font-semibold text-lg text-primary">{capitalize(task.title)}</h2>
  
      </div>

      <div className="mt-2 flex items-center gap-1">
        <span
          className={`border rounded-full px-2 py-0.5 text-xs ${priorityConfig[task.priority]?.color}`}
        >
          {priorityConfig[task.priority]?.label}
        </span>

        {task.assigned_to === user.id ? (
          <select
            value={task.status}
            onChange={(e) => handleStatusChange(task.id, e.target.value)}
            className={`text-xs border outline-none px-2 py-0.5 rounded-full font-medium ${statusConfig[task.status]?.color}`}
          >
            <option value="pending" className="bg-yellow-100 text-yellow-500">
              Pending
            </option>
            <option value="inProgress" className="bg-blue-100 text-blue-500">
              In Progress
            </option>
            <option value="done" className="bg-green-100 text-green-500">
              Done
            </option>
          </select>
        ) : (
          <span
            className={`border rounded-full px-2 py-0.5 text-xs ${statusConfig[task.status]?.color}`}
          >
            {statusConfig[task.status]?.label}
          </span>
        )}
      </div>

      <div className="flex justify-between items-center mt-2">
        <p className="text-xs text-slate-700 flex items-center gap-1">
          <LuCalendarClock />
          <span>
          {task.due_date
            ? formatDate(task.due_date)
            : "No due date"}
            </span>
        </p>
        <p>assigned members</p>
      </div>

      {role === "admin" && (
        <button
          onClick={() => navigate(`/task/${task.id}/edit`)}
          className="text-sm text-slate-700 absolute top-2.5 right-1.5"
        >
          <SlOptionsVertical />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
