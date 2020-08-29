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
}

const userRepo = new UserRepository(Transaction);

export default userRepo;
