import { Router, Request, Response } from "express";
import { check, validationResult, checkSchema } from "express-validator";

import transactionRepo from "../repository/transactionRepo";
import Transaction from "../domain/transaction";
import Utils from "../utils/responseParser";
import filterTransactions from "../domain/filters";
import transactionsService from "../services/trasactionsService";
class ExpensesRouter {
  router: Router;

  checks = [
    check("date", "La fecha de la transacción no puede ser vacia").isDate(),
    check("amount", "El campo cantidad no puede estar vacio").notEmpty(),
    check("expense", "Debe indicar si es un gasto o no").isBoolean(),
    check("category.name", "Debe indicar el nombre de la categoria").notEmpty(),
    check("category.color", "Debe indicar el color de la categoria").notEmpty(),
    check("category._id", "Debe indicar el id de la categoria").notEmpty(),
    check("userId", "Parametro incorrecto: userId").isEmpty(),
  ];

  constructor() {
    this.router = Router();
    this.routes();
  }

  routes() {
    this.router.get("/", async (req, res) => {
      const filters = filterTransactions(req);
      const transactions = await transactionRepo.searchUserTransactions(
        filters
      );
      res.json(transactions);
    });

    this.router.get("/report", async (req, res) => {
      const filters = filterTransactions(req);
      transactionsService.getReport(filters).then((report) => {
        res.json(report);
      }).catch((err)=>{
        res.status(err.status).json(Utils.getResposeError(err.message))
      })
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
            transactionUpdated.userId = req.headers.userId;
            console.log(transactionUpdated);
            transaction.overwrite(transactionUpdated);
            transaction.save();
            res.json({ message: "transacción actualizada con exiito" });
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

    this.router.delete("/:tid", async (req, res) => {
      try {
        const deletion = await transactionRepo.deleteTransaction(
          req.params.tid,
          req.headers.userId as string
        );
        if (deletion.n === 0)
          return res
            .status(404)
            .json(Utils.getResposeError("Transacción no encontrada"));
        return res.json({ message: "Transancción eliminada con exito" });
      } catch (e) {
        res.status(500).json(Utils.getResposeError(e.message));
      }
    });
  }
}

const expensesRouter = new ExpensesRouter();

export default expensesRouter.router;
