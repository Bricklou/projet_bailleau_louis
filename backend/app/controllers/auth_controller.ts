import { AccessToken } from '#models/data-structures/token'
import { AuthService } from '#services/auth_service'
import { loginUserValidator, registerUserValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { UserRepository } from '../repositories/user_repository.js'
import { UserPresenter } from '../presenters/user_presenter.js'
import { RefreshTokenRepository } from '../repositories/refresh_token_repository.js'
import { DateTime } from 'luxon'

@inject()
export default class AuthController {
  constructor(
    private authService: AuthService,
    private userRepository: UserRepository,
    private userPresenter: UserPresenter,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async login({ request, response }: HttpContext) {
    const data = await request.validateUsing(loginUserValidator)

    const user = await this.authService.login(data.email, data.password)

    const refreshToken = await this.refreshTokenRepository.createToken(user)
    const accessToken = new AccessToken(user)

    return response
      .cookie('token', refreshToken.token, {
        httpOnly: true,
        sameSite: 'strict',
        expires: refreshToken.expiresAt.toJSDate(),
        secure: true,
      })
      .header('Authorization', `Bearer ${accessToken.toJWT()}`)
      .json(this.userPresenter.toJSON(user))
  }

  async register({ request, response }: HttpContext) {
    const data = await request.validateUsing(registerUserValidator)

    const user = await this.userRepository.registerUser(data)

    const refreshToken = await this.refreshTokenRepository.createToken(user)
    const accessToken = new AccessToken(user)

    return response
      .cookie('token', refreshToken.token, {
        httpOnly: true,
        sameSite: 'strict',
        expires: refreshToken.expiresAt.toJSDate(),
        secure: true,
      })
      .header('Authorization', `Bearer ${accessToken.toJWT()}`)
      .json(this.userPresenter.toJSON(user))
  }

  async logout({ request, response }: HttpContext) {
    const tokenValue = request.cookie('token')

    if (!tokenValue) {
      return response.unauthorized()
    }

    const token = this.refreshTokenRepository.find(tokenValue)

    if (!token) {
      return response.clearCookie('token').unauthorized()
    }

    return response.clearCookie('token').ok('')
  }

  async me({ request, response }: HttpContext) {
    const user = request.user
    if (!user) {
      return response.unauthorized()
    }

    return response.json(this.userPresenter.toJSON(user))
  }

  async refresh({ request, response }: HttpContext) {
    const tokenValue = request.cookie('token')

    if (!tokenValue) {
      return response.unauthorized()
    }

    const token = await this.refreshTokenRepository.find(tokenValue)

    if (!token) {
      return response.unauthorized()
    }

    if (token.expiresAt < DateTime.now()) {
      return response.unauthorized()
    }

    await token.load('user')

    const accessToken = new AccessToken(token.user)

    return response.header('Authorization', `Bearer ${accessToken.toJWT()}`).ok('')
  }
}
