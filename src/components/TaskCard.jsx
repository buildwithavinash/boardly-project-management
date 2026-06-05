
import { capitalize, formatDate } from "../utils/formatters";
import { LuCalendarClock } from "react-icons/lu";
import { CiEdit } from "react-icons/ci";
import { deleteTask } from "../services/taskService";
import { MdOutlineDelete } from "react-icons/md";
import { useTasks } from "../context/TasksContext";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import TaskDetailModal from "./TaskDetailModal";

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

  const {tasks, setTasks} = useTasks();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handleDeleteTask = async () => {
    try {
     const {error} = await deleteTask(task.id);

     if(error){
      return;
     }

     setTasks(tasks.filter(t => t.id !== task.id));
     onTaskDelete(prev => prev.filter(t => t.id !== task.id))
    }catch(error){
      console.error("delete failed", error);
    }
  }

  const assignedMember = members?.find(m => m.id === task.assigned_to);
  return (
    <>
      {showDeleteModal && (
        <ConfirmModal onCancel={()=>setShowDeleteModal(false)} onConfirm={handleDeleteTask}/>
      )}
      <div 
        onClick={() => setShowDetailModal(true)}
        className="relative border border-border bg-background p-2 rounded-lg cursor-pointer hover:shadow-md hover:bg-slate-50 transition-all"
      >
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
        <p className="text-xs text-slate-700">Assigned to: {assignedMember ? capitalize(assignedMember.name) : 'Unassigned'}</p>
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

        <button onClick={(e) => {
          e.stopPropagation();
          setShowDeleteModal(true);
        }} className="border bg-red-200 text-red-500 rounded-md p-1 cursor-pointer">
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
