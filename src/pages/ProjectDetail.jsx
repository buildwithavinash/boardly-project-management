import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { getProjectById } from "../services/ProjectService";

const ProjectDetail = () => {
    const [projectData, setProjectData] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {id} = useParams();

    
    useEffect(()=> {

        const getData = async (id) => {
        try{
            setLoading(true)
            const {data, error} = await getProjectById(id)
            if(error){
                setError(error.message);
                return;
            }
            setProjectData(data);
        }catch(error){
            setError(error);
        }finally{
            setLoading(false)
        }
    }

        getData(id)
    }, [id])

    console.log("project data", projectData);
  return (
    <div>
        <div>
            Project Details
        </div>

        {loading && <p>Loading...</p>}

        {error ? (
            <p>{error}</p>
        ) : (
            <div>
            <h1>{projectData?.name}</h1>
            <p>{projectData?.description}</p>
        </div>
        )}
        
    </div>
  )
}

export default ProjectDetail