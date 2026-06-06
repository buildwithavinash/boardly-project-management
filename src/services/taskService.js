import { supabase } from "../lib/supabase"

export const createTask = async (taskData) => {
    const {data, error} = await supabase.from('tasks').insert(taskData).select().single();
    return {data, error}
}

export const getTasks = async (projectId) => {
    const {data, error} = await supabase.from('tasks').select("*").eq('project_id', projectId)
    return {data, error}
}

export const getTaskById = async (id) => {
    const {data, error} = await supabase.from('tasks').select("*").eq('id', id);
    return {data: data?.[0], error}
}

export const getAllTasks = async () => {
    const {data, error} = await supabase.from('tasks').select('*').order('created_at', {ascending: false});
    return {data, error}
}

export const getTasksByUser = async (userId) => {
    const {data, error} = await supabase.from('tasks').select("*").eq('assigned_to', userId);
    return {data, error}
}

export const deleteTask = async (taskId) => {
    const {data, error} = await supabase.from('tasks').delete().eq('id', taskId).select().single();
    return {data, error}
}

export const updateTask = async (id, updatedData) => {
    const {data, error} = await supabase.from('tasks').update({...updatedData}).eq('id', id).select().single();
    return {data, error}
}

// member
export const toggleTaskStatus = async (id, taskStatus) => {
    const {data, error} = await supabase.from('tasks').update({status: taskStatus}).eq('id', id)
    return {data, error}
}