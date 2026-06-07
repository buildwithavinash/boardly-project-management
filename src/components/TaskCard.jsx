import { capitalize, formatDate, isDueSoon, isOverdue } from "../utils/formatters";
import { LuCalendarClock } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { deleteTask } from "../services/taskService";
import { MdOutlineDelete } from "react-icons/md";
import { useTasks } from "../context/TasksContext";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import TaskDetailModal from "./TaskDetailModal";
import { useToast } from "../context/ToastContext";
import { FaRegUser } from "react-icons/fa";

const TaskCard = ({
  task,
  priorityConfig,
  user,
  handleStatusChange,
  statusConfig,
  role,
  navigate,
  onTaskDelete,
  members = [],
}) => {
  const { setTasks } = useTasks();
  const { addToast } = useToast();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleDeleteTask = async () => {
    try {
      const { error } = await deleteTask(task.id);
      if (error) {
        addToast("Failed to delete task.", "error");
        return;
      }

      setTasks((tasks) => tasks.filter((t) => t.id !== task.id));
      if (onTaskDelete) {
        onTaskDelete((prev) => prev.filter((t) => t.id !== task.id));
      }

      setShowDeleteModal(false);
      setShowDetailModal(false);

      addToast("Task deleted successfully!", "success");
    } catch (error) {
      console.error("delete failed", error);
      addToast("Something went wrong while deleting task.", "error");
    }
  };

  const assignedMember = members?.find((m) => m.id === task.assigned_to);
  const overdue = task.status !== 'done' && isOverdue(task.due_date);
  const dueSoon = task.status !== 'done' && isDueSoon(task.due_date)
  return (
    <>
      {showDeleteModal && (
        <ConfirmModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteTask}
        />
      )}
      <div
        onClick={() => setShowDetailModal(true)}
        className="relative border border-border bg-background p-2 rounded-lg cursor-pointer hover:shadow-md hover:bg-slate-50 transition-all"
      >
        <div className="leading-tight">
          <h2 className="font-semibold text-xl text-primary">
            {capitalize(task.title)}
          </h2>
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
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => {
                e.stopPropagation();
                handleStatusChange(task.id, e.target.value);
              }}
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

          {overdue && (
            <span className="text-xs border border-red-600 bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
              Overdue
            </span>
          )}

          {!overdue && dueSoon && (
            <span className="text-xs bg-amber-100 border border-amber-600 text-amber-600 px-2 py-0.5 rounded-full">
              Due Soon
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-2">
         

          <p className="text-xs text-slate-700 flex items-center gap-1">
            <LuCalendarClock />
            <span>
              {task.due_date ? formatDate(task.due_date) : "No due date"}
            </span>
          </p>

          <p className="text-xs text-slate-700 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-md">
            <FaRegUser size={12}/>
            {assignedMember ? capitalize(assignedMember.name) : "Unassigned"}
          </p>
        </div>

        {role === "admin" && (
          <div className="absolute top-2.5 right-1.5 flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/task/${task.id}/edit`);
              }}
              className="border border-slate-300 rounded-md p-1 cursor-pointer"
            >
              <CiEdit />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="border bg-red-200 text-red-500 rounded-md p-1 cursor-pointer"
            >
              <MdOutlineDelete />
            </button>
          </div>
        )}
      </div>

      {/* Task Detail Modal */}
      {showDetailModal && (
        <TaskDetailModal
          task={task}
          onClose={() => setShowDetailModal(false)}
          priorityConfig={priorityConfig}
          statusConfig={statusConfig}
          members={members}
        />
      )}
    </>
  );
};

export default TaskCard;
