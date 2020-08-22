import { Router } from 'express';
import bcrypt from 'bcryptjs'

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
        res.send(bcrypt.hashSync("pasawprd",10))
      });
  }
}

const expensesRouter = new ExpensesRouter()

export default expensesRouter.router