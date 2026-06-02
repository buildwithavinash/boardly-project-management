import { BiSort } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

const TaskFilters = ({role, currentFilter, setCurrentFilter, openDropdown, setOpenDropdown, priorityFilter, setPriorityFilter, statusFilter, setStatusFilter}) => {
  return (
    <>
    {/* filters */}
                <div>
                  {/* all tasks and my tasks  */}       
                  {
                    role === 'member' && (
                        <select value={currentFilter} onChange={(e)=>setCurrentFilter(e.target.value)} className="">
                    <option value="all">All tasks</option>
                    <option value="mine">My tasks</option>
                  </select>
                    )
                  }
                  
                </div>
    
                {/* status */}
                <div className="relative">
    
                  {/* trigger button */}
                  <button onClick={(e)=>{setOpenDropdown(openDropdown === 'status' ? null : 'status'); e.stopPropagation()}}><CiFilter/></button>
    
                  {/* dropdown menu */}
                  {openDropdown === 'status' && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-36">
                      {['all', 'pending', 'inProgress', 'done'].map(option => (
                        <button key={option} onClick={() => {
                          setStatusFilter(option);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50
                            ${statusFilter === option ? 'text-primary font-medium' : 'text-slate-600'}`}>
                          {option === 'all' ? 'All Status' : option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                  {/* sort by priority */}
                  <div className="relative">
    
                  {/* trigger button */}
                  <button onClick={(e)=>{setOpenDropdown(openDropdown === 'priority' ? null : 'priority'); e.stopPropagation()}}><BiSort/></button>
    
                  {/* dropdown menu */}
                  {openDropdown === 'priority' && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-lg z-10 min-w-36">
                      {['all', 'low', 'medium', 'high'].map(option => (
                        <button key={option} onClick={() => {
                          setPriorityFilter(option);
                          setOpenDropdown(null);
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-slate-50
                            ${priorityFilter === option ? 'text-primary font-medium' : 'text-slate-600'}`}>
                          {option === 'all' ? 'All' : option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
    </>
  )
}

export default TaskFilters