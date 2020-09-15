import { FilterQuery } from "mongoose";
import transactionRepo from "../repository/transactionRepo";

class TransactiosService {
  async getReport(filters: Array<Object>) {
    try {
      const expenses = await transactionRepo.categoriesReport(
        filters,
        true
      );
      const earnings = await transactionRepo.categoriesReport(
        filters,
        false
      );
      const total = await transactionRepo.totalExpensesReport(
        filters,
      );
      const balanceStatus = total[0].value - total[1].value
      total.push({finalBalance: balanceStatus})
      const report = {
        expenses,
        earnings,
        total,
      };
      return Promise.resolve(report);
    } catch (e) {
      Promise.reject({ ...e, status: 500 });
    }
  }
}

const tservice = new TransactiosService();

export default tservice;
