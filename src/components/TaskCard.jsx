import { SlOptionsVertical } from "react-icons/sl";

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
    <div className="relative border border-slate-300 p-2 rounded-lg">
      <div className="leading-tight">
        <h2 className="font-semibold">{task.title}</h2>
        {/* <p className="text-slate-800">{task.description}</p> */}
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
        <p className="text-sm">
          {task.due_date
            ? new Date(task.due_date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })
            : "No due date"}
        </p>
        <p>assigned members</p>
      </div>

      {role === "admin" && (
        <button
          onClick={() => navigate(`/task/${task.id}/edit`)}
          className="text-sm absolute top-2 right-1"
        >
          <SlOptionsVertical />
        </button>
      )}
    </div>
  );
};

export default TaskCard;
