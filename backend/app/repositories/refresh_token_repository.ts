import Token from '#models/database/token'
import User from '#models/database/user'
import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'

export class RefreshTokenRepository {
  async createToken(user: User): Promise<Token> {
    return user.related('tokens').create({
      token: randomUUID(),
      expiresAt: DateTime.now().plus({ days: 30 }),
    })
  }

  find(value: string): Promise<Token | null> {
    return Token.query().andWhere('token', value).first()
  }

  async deleteToken(token: Token): Promise<void> {
    await token.delete()
  }
}
