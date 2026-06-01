import { useEffect, useState } from "react"
import { getMembers } from "../services/profileService";
import { createTask } from "../services/taskService";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import Container from "../components/Container";

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
    <Container>

 
    <div className="">

        <div>
            <div>
                    <button onClick={() => navigate(-1)} className="flex gap-0.5 items-center font-medium bg-slate-200 rounded-md px-2 py-1 cursor-pointer hover:opacity-80 transition-all duration-200"><IoIosArrowRoundBack/> Back</button>
                  </div>
        </div>

        <div>
            <h2 className="mt-4 text-3xl text-center font-medium">Create a task</h2>
        </div>
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
                {loading ? <p>Creating...</p> : <p>Create</p>}
            </button>
        </form>
    </div>
       </Container>
  )
}

export default CreateTask