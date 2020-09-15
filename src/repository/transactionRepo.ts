import GenericRepo from "./baseRepo";
import User from "../domain/user";
import Transaction from "../domain/transaction";
class UserRepository extends GenericRepo<typeof Transaction> {
  searchUserTransactions(filters: Array<Object>) {
    return this.dataModel.aggregate(filters);
  }

  public deleteTransaction(id: string, userId: string) {
    return this.dataModel.deleteOne({ _id: id, userId: userId });
  }

  public categoriesReport(filters: Array<Object>, expense: boolean) {
    return this.dataModel.aggregate([
      ...filters,
      { $match: { expense: expense } },
      {
        $group: {
          _id: "$category._id",
          name: { $first: "$category.name" },
          color: { $first: "$category.color" },
          value: { $sum: "$amount" },
        },
      },
    ]);
  }

  public totalExpensesReport(filters: Array<Object>) {
    return this.dataModel.aggregate([
      ...filters,
      {
        $group: {
          _id: "$expense",
          value: { $sum: "$amount" },
        },
      },
    ]);
  }
}

const userRepo = new UserRepository(Transaction);

export default userRepo;

/*
gastos por categoria:
this.dataModel.aggregate([
      { $match: { userId: userId } },
      { $match: { expense: true } },
      {
        $group: {
          _id: "$category._id",
          name: {$first: "$category.name"},
          color: {$first: "$category.color"},
          total: { $sum: "$amount" },
        },
      },
    ]);

recaudación por categoria:
this.dataModel.aggregate([
      { $match: { userId: userId } },
      { $match: { expense: true } },
      {
        $group: {
          _id: "$category._id",
          name: {$first: "$category.name"},
          color: {$first: "$category.color"},
          total: { $sum: "$amount" },
        },
      },
    ]);

Total gastos/recaudación
this.dataModel.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$expense",
          total: { $sum: "$amount" },
        },
      },
    ]);
 */
