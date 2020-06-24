import { connection } from '../connect.database'
import { User } from './user.type'

export const login = async (userLoginDto: User): Promise<boolean> => {
    const result = await connection.select('*')
        .from('usertbl')
        .where({
            username: userLoginDto.username,
            password: userLoginDto.password
        })
    if (!result.length) {
        return false
    }
    return true
}

export const getUserByUsername = async (username: string): Promise<User> => {
    const user = await connection.select('*')
                        .from('usertbl')
                        .where({ username })
    return user[0] as User
}

export const signup = async (userSignupDto: User): Promise<User> => {
    const user = await connection('usertbl')
                        .insert({
                            username: userSignupDto.username,
                            password: userSignupDto.password
                        })
                        .returning('*')
    return user[0] as User
}