import { Request, Response, NextFunction } from 'express'

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const userId = req!.session!.userId
    if(!userId){
        return res.redirect('/login')
    }
    next()
}