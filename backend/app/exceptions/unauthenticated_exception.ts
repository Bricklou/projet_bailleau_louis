import { Exception } from '@adonisjs/core/exceptions'

export default class UnauthenticatedException extends Exception {
  static status = 401
  static message = 'Authenticated user required, but none found'
}
