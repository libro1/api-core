import { Request } from "express";

import { mongoose } from "@typegoose/typegoose";

const filterTransactions = (req: Request) => {
  const filters: Array<Object> = [{ $match: { userId: req.headers.userId } }];

  if (req.query.expense !== undefined)
    filters.push({
      $match: { expense: JSON.parse(req.query.expense as string) },
    });

  if (req.query.month)
    filters.push(
      { $addFields: { month: { $month: "$date" } } },
      { $match: { month: Number(req.query.month) } }
    );

  if (req.query.year)
    filters.push(
      { $addFields: { year: { $year: "$date" } } },
      { $match: { year: Number(req.query.year) } }
    );

  if (req.query.category)
    filters.push({
      $match: {
        "category._id": mongoose.Types.ObjectId(req.query.category as string),
      },
    });

  req.body.filters = filters;

  return filters;
};

export default filterTransactions;
