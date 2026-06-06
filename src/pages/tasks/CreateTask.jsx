import { useEffect, useState } from "react"
import { getMembers } from "../../services/profileService";
import { createTask } from "../../services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Container from "../../components/Container";
import { capitalize } from "../../utils/formatters";
import { useToast } from "../../context/ToastContext";
import { useTasks } from "../../context/TasksContext";

const CreateTask = () => {
    const {id} = useParams();
    const {addToast} = useToast();
    const {setTasks} = useTasks();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        assigned_to: '',
        project_id: id,
        due_date: ''
    })
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(()=> {
        const getData = async () => {
            setLoading(true)
            try{
                const {data, error} = await getMembers();
                if(error){
                    setError(error.message);
                }
                setMembers(data)
            }catch(error){
                setError(error)
            }finally{
                setLoading(false)
            }
        }

        getData();

    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if(!formData.title.trim()){
            setError('Task title is required.');
            addToast('Task title is required.', 'error');
            return
        }
        const taskData = {
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            due_date: formData.due_date || null,
            assigned_to: formData.assigned_to || null
        }

        const {data, error} = await createTask(taskData)
        if(error) {
            setError(error.message)
            addToast('Failed to create task. Please try again.', 'error')
            return
        }

        setTasks(prev => [data, ...prev])
        setFormData({
            title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        assigned_to: '',
        project_id: id,
        due_date: ''
        })
        addToast('Task created successfully!', 'success')
        navigate(`/projects/${id}`)
    }
  return (
    <Container>

 
    <div className="">

        <div>
            <div>
                    <button onClick={() => navigate(-1)} className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-2 cursor-pointer hover:opacity-80 transition-all duration-200"><IoIosArrowRoundBack/></button>
                  </div>
        </div>

        <div>
            <h2 className="mt-4 text-3xl text-center font-medium text-primary">Create a task</h2>
        </div>
        <form onSubmit={handleSubmit} className="border border-border bg-card rounded-md p-4 flex flex-col gap-2 mt-4 justify-center">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task name" className="border border-slate-300 bg-background focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border border-slate-300 bg-background focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"/>

            <div className="flex items-center gap-2">
                <label htmlFor="due_date" className="font-semibold text-slate-800">Due Date: </label>
                    <input type="date" name="due_date" placeholder="Pick a date" value={formData.due_date} onChange={handleChange} className="flex-1 bg-background flex items-center justify-center border px-4 py-2 border-border rounded-md"/>
               
            </div>
            <div className="flex items-center gap-2">
            <label htmlFor="status" className="font-semibold text-slate-800">Status: </label>
            <select name="status" value={formData.status} onChange={handleChange} className="border border-slate-300 focus:border-border bg-background focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1">
                <option value="pending">Pending</option>
                <option value="inProgress">In progress</option>
                <option value="done">Done</option>
            </select>
            </div>

            <div className="flex items-center gap-2">
            <label htmlFor="priority" className="font-semibold text-slate-800">Priority: </label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="border border-slate-300 focus:border-border bg-background focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            </div>

            <div className="flex items-center gap-2">
            <label htmlFor="assigned_to" className="font-semibold text-slate-800">Select member: </label>
            <select name="assigned_to" value={formData.assigned_to} onChange={handleChange} className="border border-slate-300 focus:border-border bg-background focus:outline-none transition-all duration-200 px-1 py-2 rounded-md flex-1">
                <option value="">Select member</option>
                {members.map(member => (
                    <option key={member.id} value={member.id}>{capitalize(member.name)}</option>
                ))}
            </select>
                </div>

                {error && <p>{error}</p>}
            <button type="submit" disabled={loading}
          className="bg-primary text-white font-medium px-4 py-2 rounded-md cursor-pointer hover:opacity-80 transition-all duration-200 mt-2 self-stretch">
                {loading ? <p>Creating...</p> : <p>Create Task</p>}
            </button>
        </form>
    </div>
       </Container>
  )
}

export default CreateTask