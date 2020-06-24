import { connection } from '../connect.database'
import { Task } from './task.type'

export const getTasksByUser = async (username: string): Promise<Task[]> => {
    const result = await connection('tasktbl')
                        .join('usertbl', 'tasktbl.userid', '=', 'usertbl.id')
                        .select('tasktbl.*')
    const tasks: Task[] = result
    return tasks
}