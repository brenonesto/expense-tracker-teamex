import { useState } from "react";
import Summary from "./components/summary";
import TransactionDialog from "./components/transaction-dialog";
import TransactionFilters from "./components/transaction-filters";
import TransactionsTable from "./components/transactions-table";
import useTransactions from "./hooks/useTransactions";
import type { TransactionFilters as Filters } from "./types/transaction";

export default function App() {
  const [filters, setFilters] = useState<Filters>({
    category: undefined,
    dateRange: undefined,
  });

  const { transactions, addTransaction, updateTransaction, pagination } =
    useTransactions(filters);

  return (
    <div className="min-h-dvh w-full">
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <h1 className="text-2xl font-bold">Expense.Tracker</h1>
        <TransactionDialog addTransaction={addTransaction} />
      </header>
      <div className="max-w-5xl mx-auto p-4 space-y-6">
        <Summary transactions={transactions} />
        <TransactionFilters filters={filters} onFiltersChange={setFilters} />
        <TransactionsTable
          transactions={transactions}
          addTransaction={addTransaction}
          updateTransaction={updateTransaction}
          pagination={pagination}
        />
      </div>
    </div>
  );
}
