import { Request, Response, NextFunction } from "express";
import { isUndefined } from "util";
import { mongoose } from "@typegoose/typegoose";
import { json } from "body-parser";

const filterTransactions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filters: Array<Object> = [{ $match: { userId: req.headers.userId } }];

  if (!isUndefined(req.query.expense))
    filters.push({ $match: { expense: JSON.parse(req.query.expense as string) } });

  if (req.query.month)
    filters.push(
      { $addFields: { month: { $month: "$date" } } },
      { $match: { month: Number(req.query.month) } }
    );

  if (req.query.category)
    filters.push({
      $match: {
        "category._id": mongoose.Types.ObjectId(req.query.category as string),
      },
    });

  req.body.filters = filters;
  next();
};

export default filterTransactions;
