import { inject } from '@adonisjs/core'
import { UserRepository } from '../repositories/user_repository.js'
import InvalidCredentialsException from '#exceptions/invalid_credentials_exception'

@inject()
export class AuthService {
  constructor(private userService: UserRepository) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsException()
    }

    if (!(await user.validatePassword(password))) {
      throw new InvalidCredentialsException()
    }

    return user
  }
}
