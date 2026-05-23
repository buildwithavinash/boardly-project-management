import { useEffect, useState } from "react"
import { getMembers } from "../services/profileService";
import { createTask } from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";

const CreateTask = () => {
    const {id} = useParams();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        assigned_to: '',
        project_id: id
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
        console.log('formdata: ', formData);

        const taskData = {
            ...formData,
            assigned_to: formData.assigned_to || null
        }
        const {error} = await createTask(taskData)
        if(error) return
        setFormData({
            title: '',
        description: '',
        status: 'pending',
        priority: 'low',
        assigned_to: '',
        project_id: id
        })
        navigate(`/projects/${id}`)
    }
  return (
    <div>
       {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"/>
            <select name="status" value={formData.status} onChange={handleChange}>
                <option value="pending">pending</option>
                <option value="inProgress">in progress</option>
                <option value="done">done</option>
            </select>
            <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <select name="assigned_to" value={formData.assigned_to}>
                {loading && <p>Loading...</p>}
                <option value="">Select member</option>
                {members.map(member => (
                    <option key={member.id} value={member.id}>{member.name}</option>
                ))}
            </select>

            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md cursor-pointer">Create</button>
        </form>
    </div>
  )
}

export default CreateTask