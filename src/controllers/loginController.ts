import { Router, Request, Response } from 'express'
import { check, validationResult } from 'express-validator'

import userService from '../services/userService';
import Utils from '../utils/responseParser';

class ExpensesRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.post('/register',
      [
        check('name', 'El nombre no puede estar vacio').not().isEmpty(),
        check('lastName', 'El apellido no puede estar vacio').not().isEmpty(),
        check('email', 'El e-mail es invalido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
      ],
      (req: Request, res: Response) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) { return res.status(400).json(errors) }
        userService.createUser(req.body)
          .then((msg) => res.status(201).json({message: "El usuario se ha creado con exito!"}))
          .catch((err) => {
            if (err.code === 11000) //Compruebo el codigo de error de index
              res.status(422).json(Utils.getResposeError("Error al crear el usuario ❌, mail ya existe"))
            res.status(500).json(Utils.getResposeError("Error al crear el usuario ❌"))
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