import { supabase } from "../lib/supabase"

export const createProject = async (projectData) => {
    console.log("Project data", projectData);
    const { data, error } = await supabase.from('projects').insert({...projectData})
    return { data, error }
}

export const getProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*')
    return { data, error }
}

export const getProjectById = async (id) => {
    const {data, error} = await supabase.from('projects').select('*').eq('id', id)
    return {data: data?.[0], error}
}

export const updateProject = async (id, updatedData) => {
    const { data, error } = await supabase.from('projects').update({...updatedData}).eq('id', id)
    return { data, error }
}

export const deleteProject = async (id) => {
    const { data, error } = await supabase.from('projects').delete().eq('id', id)
    return { data, error }
}