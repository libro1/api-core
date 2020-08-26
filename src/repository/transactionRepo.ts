import GenericRepo from "./baseRepo";
import User from "../domain/user";
import Transaction from "../domain/transaction";
class UserRepository extends GenericRepo<typeof Transaction> {
  searchUserTransactions(userId: string) {
    return this.dataModel.find({ userId: userId });
  }

  updateTransaction(
    transactionId: string,
    userId: string,
    transactionUpdated: Transaction
  ) {
    return this.dataModel.replaceOne(
      { _id: transactionId, userId: userId },
      transactionUpdated
    );
  }
}

const userRepo = new UserRepository(Transaction);

export default userRepo;
