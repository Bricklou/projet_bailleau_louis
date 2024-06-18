import Token from '#models/database/token'
import User from '#models/database/user'
import { randomUUID } from 'node:crypto'
import { DateTime } from 'luxon'

export class RefreshTokenRepository {
  createToken(user: User): Promise<Token> {
    const token = new Token()
    token.related('user').associate(user)
    token.token = randomUUID()
    token.expiresAt = DateTime.now().plus({ days: 30 })

    return token.save()
  }

  find(value: string): Promise<Token | null> {
    return Token.query().andWhere('token', value).first()
  }

  async deleteToken(token: Token): Promise<void> {
    await token.delete()
  }
}
