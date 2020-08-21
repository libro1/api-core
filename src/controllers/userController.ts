import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

import userService from '../services/userService';
import Utils from '../ultils';
import { rejects } from 'assert';

class ExpensesRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    /*this.router.get('/',
      (req, res) => {
        const user = User.fromBody(JSON.stringify({ 'name': 'walter', 'lastName': 'Gómez' }))
        userRepo.create(user)
          .then(() => res.send("creado"))
          .catch(() => res.send("error"))
      });*/
    this.router.post('/',
      [
        check('name', 'El nombre no puede estar vacio').not().isEmpty(),
        check('lastName', 'El apellido no puede estar vacio').not().isEmpty(),
        check('email', 'El e-mail es invalido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
      ],
      (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { res.status(422).json(errors) }
        userService.createUser(req.body)
          .then((msg) => res.json({message: "El usuario se ha creado con exito!"}))
          .catch((err) => {
            if (err.code === 11000) //Compruebo el codigo de error de index
              res.status(400).json(Utils.getResposeError("Error al crear el usuario ❌, mail ya existe"))
            res.status(422).json(Utils.getResposeError("Error al crear el usuario ❌"))
          })
      }
    )

    this.router.post('/login', (req, res) => {
        userService.login(req.body)
        .then(respo=> res.json(respo))
        .catch(()=> res.status(401).json(Utils.getResposeError("Error en usuario y/o contraseña")))
      }
    )
  }
}

const expensesRouter = new ExpensesRouter()

export default expensesRouter.router