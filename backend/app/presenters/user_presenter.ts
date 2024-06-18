import User from '#models/database/user'
import { AbstractUser } from '#models/interfaces/user'

export class UserPresenter {
  toJSON(user: User): AbstractUser {
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
  }
}
