import { Router } from 'express';
import userRepo from '../repository/userRepository'
import User from '../domain/user'
class ExpensesRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get('/',
      (req, res) => {
        const user = User.fromBody(JSON.stringify({'name':'walter','lastName':'Gómez'}))
        userRepo.create(user)
          .then(() => res.send("creado"))
          .catch(() => res.send("error"))
      });
  }
}

const expensesRouter = new ExpensesRouter()

export default expensesRouter.router