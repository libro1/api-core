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
        res.json(req.body)
      });
  }
}

const expensesRouter = new ExpensesRouter()

export default expensesRouter.router