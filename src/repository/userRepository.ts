import GenericRepo from './baseRepo'
import User from '../domain/user'
class UserRepository extends GenericRepo<typeof User>{

    searchByEmail(email: string){
        return this.dataModel.findOne({email: email})
    }

}

const userRepo = new UserRepository(User)

export default userRepo