import { authConfig } from '@/configs/auth'
import { AppError } from '@/utils/app-error'
import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface TokenPayload {
  role: string
  sub: string
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try { 
    const authHeader = request.headers.authorization

    if(!authHeader) {
      throw new AppError("JWT token not found", 401)
    }

    const [_, token] = authHeader.split(" ")

    const { 
      role, 
      sub: user_id
    } = verify(token, authConfig.jwt.secret) as TokenPayload

    request.user = {
      id: Number(user_id),
      role,
    }
    
    return next()
  } catch {
    throw new AppError("Invalid JWT token", 401)
  }
}

export { ensureAuthenticated }