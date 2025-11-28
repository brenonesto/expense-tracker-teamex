import { cn } from "@/lib/utils";
import { type Transaction, TransactionType } from "@/types/transaction";

export default function Summary({
  transactions,
}: {
  transactions: Transaction[];
}) {
  const totalIncome = transactions
    .filter((transaction) => transaction.type === TransactionType.INCOME)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === TransactionType.EXPENSE)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

  return (
    <div className="flex flex-col gap-4 mb-4">
      <h2 className="text-lg font-bold">Summary</h2>
      <div className="flex gap-4">
        <div className="border p-4 rounded-md bg-green-100 w-full">
          <span className="text-md font-bold">Total Income</span>
          <p className="text-lg text-green-500 font-bold text-right">
            {totalIncome.toLocaleString()}
          </p>
        </div>
        <div className="border p-4 rounded-md bg-red-100 w-full">
          <span className="text-md font-bold">Total Expenses</span>
          <p className="text-lg text-red-500 font-bold text-right">
            {totalExpenses.toLocaleString()}
          </p>
        </div>
        <div className="border p-4 rounded-md bg-blue-100 w-full">
          <span className="text-md font-bold">Total Balance</span>
          <p
            className={cn(
              "text-lg text-blue-500 font-bold text-right",
              totalIncome - totalExpenses > 0
                ? "text-green-500"
                : "text-red-500"
            )}
          >
            {(totalIncome - totalExpenses).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
