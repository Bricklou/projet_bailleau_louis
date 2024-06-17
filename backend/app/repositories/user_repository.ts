import User from '#models/database/user'
import { RegisterUserDto } from '../dto/register_user.dto.js'

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return User.findBy('email', email)
  }

  async registerUser(data: RegisterUserDto): Promise<User> {
    const user = new User()
    user.email = data.email
    user.firstName = data.first_name
    user.lastName = data.last_name
    user.password = data.password

    return user.save()
  }
}
