import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getProjectById, updateProject } from "../../services/projectService";
import Container from "../../components/Container";
import { useToast } from "../../context/ToastContext";

const EditProject = () => {
    const [editProject, setEditProject] = useState(null)
    const [formData, setFormData] = useState({name: '', description: ''});
    const {id} = useParams();
    const {addToast} = useToast();
    const navigate = useNavigate();

    useEffect(()=>{
        const getData = async () => {
            const {data, error} = await getProjectById(id)
            if(error) return;
            setEditProject(data);
             setFormData({
            name: data.name,
            description: data.description
        })
        }

        getData();
       
    }, [id])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {error} = await updateProject(id, formData);
        if(error) {
        addToast('Failed to update project. Please try again.', 'error')
          return;  
        } 

        addToast('Project updated successfully!', 'success')
        navigate(`/projects/${id}`);
    }

    
  return (
    <Container>
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={formData.name} onChange={handleChange}/>
            <textarea name="description" value={formData.description} onChange={handleChange}/>
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md">Update</button>
        </form>
    </div>
    </Container>
  )
}

export default EditProject