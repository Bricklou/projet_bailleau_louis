import User from '#models/database/user'
import env from '#start/env'
import jwt, { Jwt } from 'jsonwebtoken'

export abstract class Token {
  private userId: number
  private email: string

  constructor(
    user: User,
    private duration: string
  ) {
    this.userId = user.id
    this.email = user.email
  }

  toJWT(): string {
    return jwt.sign({ id: this.userId, username: this.email }, env.get('APP_KEY'), {
      expiresIn: this.duration,
    })
  }

  static validate(token: string): Jwt {
    return jwt.verify(token, env.get('APP_KEY'), {
      complete: true,
      algorithms: ['HS256'],
      clockTolerance: 0,
      ignoreExpiration: false,
      ignoreNotBefore: false,
    })
  }
}

export class AccessToken extends Token {
  constructor(user: User) {
    super(user, '10m')
  }
}

export class RefreshToken extends Token {
  constructor(user: User) {
    super(user, '30d')
  }
}
