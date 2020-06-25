import { connection } from '../connect.database'
import { Task } from './task'
import { CreateTaskDto } from './create.task.dto'

export const getTasksByUser = async (userId: number): Promise<Task[]> => {
    if (!userId) {
        userId = 0
    }
    const tasks = await connection.select('*')
        .from('tasktbl')
        .where({ userid: userId })
    return tasks as Task[]
}

export const deleteTask = async (id: number): Promise<void> => {
    await connection('tasktbl')
        .delete()
        .where({ id })
    return
}

export const createTask = async (createTaskDto: CreateTaskDto): Promise<Task> => {
    const task = await connection('tasktbl')
        .insert({
            title: createTaskDto.title,
            userid: createTaskDto.userId
        })
        .returning('*')
    return task[0] as Task
}