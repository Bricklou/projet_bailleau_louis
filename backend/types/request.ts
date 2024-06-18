import User from '#models/database/user'
import { JwtPayload } from 'jsonwebtoken'

declare module '@adonisjs/core/http' {
  export interface Request {
    jwt?: import('jsonwebtoken').Jwt & { payload: JwtPayload }
    user?: User
  }
}
