import { LuCalendarClock } from "react-icons/lu";
import { Link } from "react-router-dom";
import {
  capitalize,
  formatDate,
  isDueSoon,
  isOverdue,
} from "../../utils/formatters";
import { MdChevronRight } from "react-icons/md";

const ProjectCard = ({ proj }) => {
  const overdue = isOverdue(proj.due_date);
  const dueSoon = isDueSoon(proj.due_date);
  return (
    <Link to={`/projects/${proj.id}`}>
      <div className="flex justify-between items-center border border-border bg-card rounded-2xl p-2 hover:bg-slate-50 transition-all duration-150">
        <div className="flex flex-col">
          <div className="flex-1 mb-2">
            <h3 className="font-semibold text-primary text-lg line-clamp-1">
              {capitalize(proj.name)}
            </h3>
            <p className="text-sm text-slate-700 line-clamp-1">
              {capitalize(proj.description)}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs flex items-center gap-1 text-slate-800">
              <LuCalendarClock /> Due Date:{" "}
              <span>
                {proj.due_date ? formatDate(proj.due_date) : " No due date"}
              </span>
            </p>

            {overdue && (
              <span className="text-xs bg-red-100 text-red-600 border border-red-600 px-2 py-0.5 rounded-full inline-block">
                Overdue
              </span>
            )}

            {!overdue && dueSoon && (
              <span className="text-xs bg-amber-100 text-amber-600 border border-amber-600 px-2 py-0.5 rounded-full mt-1 inline-block mb-1">
                Due soon
              </span>
            )}
          </div>
        </div>

        <div>
          <MdChevronRight className="self-center" />
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
