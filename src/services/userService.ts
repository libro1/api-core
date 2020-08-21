import bcrypt from 'bcryptjs'
import jwt from 'jwt-simple'
import moment from 'moment'

import userRepo from '../repository/userRepository'
import User from '../domain/user'
import Utils from '../ultils'
import { promises } from 'fs'


class UserService {

  createUser(reqUser: User): Promise<Object> {
    reqUser.password = bcrypt.hashSync(reqUser.password, 10)
    const newUser = User.fromBody(reqUser)
    return userRepo.create(newUser)
  }

  async login(reqUser: User) {
    const user = await userRepo.searchByEmail(reqUser.email).exec()
    if (user) {
      const isPasswordOk = bcrypt.compareSync(reqUser.password, user.password)
      if (isPasswordOk)
        return Promise.resolve({ 
          token: this.createToken(user),
          name: user.name,
          fullName: `${user.name} ${user.lastName}`,
          userId: user.id,
        })
    }
    return Promise.reject()
  }

  createToken(user:User){
    const payload = {
      usuarioId: user.id,
      createdAt: moment().unix(),
      expiredAr:  moment().add(6,'hours').unix()
    }

    return jwt.encode(payload,process.env.SECRET || "ee")
  }

}


export default new UserService()