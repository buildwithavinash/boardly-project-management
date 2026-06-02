import { useNavigate, useParams } from 'react-router-dom'
import Container from '../../components/Container'
import { useEffect, useState } from 'react';
import { getTaskById, updateTask } from '../../services/taskService';
import { getMembers } from '../../services/profileService';
const EditTask = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        assigned_to: '',
    })

    useEffect(()=> {
        
            const getData = async () => {
                try {
                    setLoading(true);
                    const {data, error} = await getTaskById(id);
                    const {data: memberData, error: memberError} = await getMembers();
                    if(error) {
                        setError(error.message);
                        return
                    }
                    if(memberError){
                         setError(error.message);
                        return
                    }
                    setTaskToEdit(data);
                    setMembers(memberData);
                     setFormData({ 
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    priority: data.priority,
                    assigned_to: data.assigned_to || '',
                })
                }catch(error){
                    setError(error)
                }finally {
                    setLoading(false);
                }
            }
        getData();
    }, [id])

    const handleChange = (e) => {
        const {name, value} = e.target

        setFormData(prev=> ({...prev, [name]: value}))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setLoading(true);
            const {error} = await updateTask(id, formData);
            if(error){
                setError(error.message);
                return
            }
            navigate(`/projects/${taskToEdit.project_id}`)
        }catch(error){
            setError(error);
        }finally{
            setLoading(false)
        }

        setFormData({
            title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        assigned_to: '',
        })
    }

    console.log(taskToEdit);
  return (
    <Container>

        <div>
            <button onClick={()=>navigate(-1)}>Back</button>
        </div>
    <div>
        <h3>Edit Task</h3>
        

        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4 justify-center">
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Task name" className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"/>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md"/>

            <div className="flex items-center gap-2">
            <label htmlFor="status">Status: </label>
            <select name="status" value={formData.status} onChange={handleChange} className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1">
                <option value="pending">pending</option>
                <option value="inProgress">in progress</option>
                <option value="done">done</option>
            </select>
            </div>

            <div className="flex items-center gap-2">
            <label htmlFor="priority">Priority: </label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1">
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            </div>

            <div className="flex items-center gap-2">
            <label htmlFor="assigned_to">Select member: </label>
            <select name="assigned_to" value={formData.assigned_to} onChange={handleChange} className="border border-slate-300 focus:border-border focus:outline-none transition-all duration-200 px-4 py-2 rounded-md flex-1">
                <option value="">Select member</option>
                {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                ))}
            </select>
                </div>

                {error && <p>{error}</p>}
            <button type="submit" disabled={loading}
          className="bg-primary text-white font-medium px-4 py-2 rounded-md self-center cursor-pointer hover:opacity-80 transition-all duration-200">
                {loading ? <p>Updating...</p> : <p>Update</p>}
            </button>
        </form>
        </div>
    </div>
    </Container>
  )
}

export default EditTask