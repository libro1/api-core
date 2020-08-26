import { Router, Request, Response } from "express";
import transactionRepo from "../repository/transactionRepo";
import Transaction from "../domain/transaction";
import Utils from "../utils/responseParser";
import { check, validationResult, checkSchema } from "express-validator";

class ExpensesRouter {
  router: Router;

  checks = [
    check("date", "La fecha de la transacción no puede ser vacia").isDate(),
    check("amount", "El campo cantidad no puede estar vacio").notEmpty(),
    check("expense", "Debe indicar si es un gasto o no").isBoolean(),
    check("category.name", "Debe indicar el nombre de la categoria").notEmpty(),
    check("category.color", "Debe indicar el color de la categoria").notEmpty(),
    check("category._id", "Debe indicar el id de la categoria").notEmpty(),
  ];

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", async (req, res) => {
      const transactions = await transactionRepo.searchUserTransactions(
        req.headers.userId as string
      );
      res.json(transactions);
    });

    this.router.post("/", this.checks, async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }
      try {
        const transaction = Transaction.fromBody(req.body);
        transaction.userId = req.headers.userId as string;
        await transactionRepo.create(transaction);
        return res.json({ message: "transacción agregada con exito" });
      } catch (e) {
        return res.status(500).json(Utils.getResposeError(e.message));
      }
    });

    this.router.put(
      "/:tid",
      this.checks,
      async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json(errors);
        }
        try {
          const transaction = await transactionRepo.searchById(req.params.tid);
          const transactionUpdated = Transaction.fromBody(req.body);
          if (transaction && transaction.userId == req.headers.userId) {
            transactionUpdated.userId = req.headers.userId
            console.log(transactionUpdated)
            transaction.overwrite(transactionUpdated)
            transaction.save()
            res.json({message: 'transacción actualizada con exiito'})
          } else {
            res
              .status(404)
              .json(Utils.getResposeError("Transacción no econtrada"));
            return res.json({ message: "transacción actualizada con exito" });
          }
        } catch (e) {
          return res.status(500).json(Utils.getResposeError(e.message));
        }
      }
    );
  }
}

const expensesRouter = new ExpensesRouter();

export default expensesRouter.router;
