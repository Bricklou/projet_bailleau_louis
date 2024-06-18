import User from '#models/database/user'
import env from '#start/env'
import jwt, { Jwt, JwtPayload } from 'jsonwebtoken'
import { DateTime, Duration } from 'luxon'

export interface AppJwtPayload {
  userId: number
  email: string
}

export class AccessToken {
  private userId: number
  private email: string

  constructor(
    user: User,
    private duration: Duration = Duration.fromObject({ minute: 5 })
  ) {
    this.userId = user.id
    this.email = user.email
  }

  get expiredIn(): Date {
    return DateTime.now().plus(this.duration).toJSDate()
  }

  toJWT(): string {
    return jwt.sign(
      { userId: this.userId, email: this.email } satisfies AppJwtPayload,
      env.get('APP_KEY'),
      {
        expiresIn: this.duration.as('second'),
      }
    )
  }

  static validate(token: string): Jwt & { payload: JwtPayload } {
    return jwt.verify(token, env.get('APP_KEY'), {
      complete: true,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    }) as Jwt & { payload: JwtPayload }
  }
}
