import { supabase } from "../lib/supabase"

export const createTask = async (taskData) => {
    const {data, error} = await supabase.from('tasks').insert(taskData)
    return {data, error}
}

export const getTasks = async (projectId) => {
    const {data, error} = await supabase.from('tasks').select("*").eq('project_id', projectId)
    return {data, error}
}

export const deleteTask = async (taskId) => {
    const {data, error} = await supabase.from('tasks').delete().eq('id', taskId)
    return {data, error}
}

export const updateTask = async (id, updatedData) => {
    const {data, error} = await supabase.from('tasks').update({...updatedData}).eq('id', id);
    return {data, error}
}