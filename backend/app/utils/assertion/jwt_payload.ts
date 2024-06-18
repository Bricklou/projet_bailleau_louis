import { AppJwtPayload } from '#models/data-structures/token'
import { JwtPayload } from 'jsonwebtoken'

export function isValidPayload(jwtPayload: JwtPayload): jwtPayload is AppJwtPayload {
  return 'userId' in jwtPayload
}
