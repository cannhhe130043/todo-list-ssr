import { connection } from '../connect.database'
import { User } from './user.type'

export const login = async (userLoginDto: User): Promise<User> => {
    const users = await connection.select('*')
        .from('usertbl')
        .where({
            username: userLoginDto.username,
            password: userLoginDto.password
        })
    return users[0] as User
}

export const getUserByUsername = async (username: string): Promise<User> => {
    const users = await connection.select('*')
                        .from('usertbl')
                        .where({ username })
    return users[0] as User
}

export const signup = async (userSignupDto: User): Promise<User> => {
    const users = await connection('usertbl')
                        .insert({
                            username: userSignupDto.username,
                            password: userSignupDto.password
                        })
                        .returning('*')
    return users[0] as User
}