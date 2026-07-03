import { MdClose } from "react-icons/md";
import { LuCalendarClock } from "react-icons/lu";
import { HiOutlineUser } from "react-icons/hi";
import { capitalize, formatDate } from "../utils/formatters";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const TaskDetailModal = ({
  task,
  onClose,
  priorityConfig,
  statusConfig,
  members,
}) => {
  const { role } = useAuth();
  const navigate = useNavigate();

  if (!task) return null;

  // Find assigned member
  const assignedMember = members?.find((m) => m.id === task.assigned_to);

  return (
    <div className="fixed inset-0 backdrop-blur-sm  flex items-center justify-center z-50 p-4">
      <div className="bg-white relative rounded-lg border border-slate-200 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl scrollbar-thin scrollbar-thumb-primary/80">
        {/* Header */}  
        <div className="flex justify-between items-start p-6 bg-slate-50">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-xl line-clamp-1 flex-1 font-bold text-primary">
              {capitalize(task.title)}
            </h2>

            <div className="flex items-center gap-2 mt-1">
              <span
                className={`inline-block border rounded-full px-3 py-1 text-xs font-medium ${
                  statusConfig?.[task.status]?.color ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {statusConfig?.[task.status]?.label || task.status}
              </span>

              <span
                className={`inline-block border rounded-full px-3 py-1 text-xs font-medium ${
                  priorityConfig?.[task.priority]?.color ||
                  "bg-gray-100 text-gray-700"
                }`}
              >
                {priorityConfig?.[task.priority]?.label || task.priority}
              </span>
            </div>
            {/* <p className="text-xs text-slate-500 mt-1">Task ID: {task.id.slice(0, 8)}...</p> */}
          </div>
          <button
            onClick={onClose}
            className="text-slate-500 fixed top-2 right-2 hover:text-slate-700 p-1 cursor-pointer"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {capitalize(task.description) || (
                <span className="text-slate-400 italic">
                  No description provided
                </span>
              )}
            </p>
          </div>

          {/* Due Date */}
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2 text-sm">
              <LuCalendarClock size={16} />
              Due Date:
            </h3>
            <p className="text-slate-600 text-sm">
              {task.due_date ? (
                formatDate(task.due_date)
              ) : (
                <span className="text-slate-400">No due date</span>
              )}
            </p>
          </div>

          {/* Assigned Member */}
          <div className="flex items-center justify-between gap-2 flex-nowrap text-xs">
            <h3 className="font-semibold text-slate-800 flex items-center flex-nowrap gap-2 text-sm">
              <HiOutlineUser size={16} />
              Assigned To:
            </h3>
            {assignedMember ? (
              <div className="flex items-center px-2 py-1 gap-3 bg-blue-50 rounded-md">
                <div className="w-5 h-5 rounded-full bg-blue-300 flex items-center justify-center text-sm font-bold text-blue-900">
                  {assignedMember.name?.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-slate-800">
                    {capitalize(assignedMember.name)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-slate-400 text-sm italic">Unassigned</p>
            )}
          </div>

          {/* Metadata */}
          <div className="border-t border-t-slate-300 pt-4 text-xs text-slate-500 space-y-1">
            <p>
              Created: {task.created_at ? formatDate(task.created_at) : "N/A"}
            </p>
            <p>
              Updated: {task.updated_at ? formatDate(task.updated_at) : "N/A"}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex sticky bottom-0 left-0 right-0 gap-2  border-t border-slate-200 px-2 py-4 bg-slate-50">
          <button
            onClick={onClose}
            className="flex-1 border bg-slate-100 border-slate-400 px-4 py-2 rounded-md hover:bg-slate-100 transition-colors font-medium text-sm cursor-pointer text-slate-700"
          >
            Close
          </button>

          {role === "admin" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/task/${task.id}/edit`);
              }}
              className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:opacity-80 transition-opacity font-medium text-sm cursor-pointer"
            >
              Edit Task
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;
