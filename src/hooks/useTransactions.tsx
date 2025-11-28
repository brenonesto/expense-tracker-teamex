import { useEffect, useState } from "react";
import {
  type Transaction,
  TransactionCategory,
  type TransactionFilters,
  TransactionType,
} from "@/types/transaction";
import { generateTransactionId } from "@/utils/helpers";

const ITEMS_PER_PAGE = 10;

const initialTransactions: Transaction[] = [
  {
    id: generateTransactionId(),
    date: new Date("2025-10-27"),
    amount: 3500,
    type: TransactionType.INCOME,
    category: TransactionCategory.HOUSING,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-10-28"),
    amount: 45.5,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-10-29"),
    amount: 120,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.UTILITIES,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-10-30"),
    amount: 25.75,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.TRANSPORT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-01"),
    amount: 89.99,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-02"),
    amount: 62.3,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-03"),
    amount: 2500,
    type: TransactionType.INCOME,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-04"),
    amount: 15.2,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.TRANSPORT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-05"),
    amount: 1200,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.HOUSING,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-06"),
    amount: 54.8,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-08"),
    amount: 78.45,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-09"),
    amount: 32.6,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.TRANSPORT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-10"),
    amount: 95.2,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.UTILITIES,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-11"),
    amount: 150,
    type: TransactionType.INCOME,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-12"),
    amount: 41.9,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-14"),
    amount: 200,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-15"),
    amount: 3500,
    type: TransactionType.INCOME,
    category: TransactionCategory.HOUSING,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-16"),
    amount: 67.85,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-17"),
    amount: 28.5,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.TRANSPORT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-19"),
    amount: 110,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.UTILITIES,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-20"),
    amount: 500,
    type: TransactionType.INCOME,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-22"),
    amount: 145.6,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.ENTERTAINMENT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-24"),
    amount: 73.25,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-26"),
    amount: 38.9,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.TRANSPORT,
  },
  {
    id: generateTransactionId(),
    date: new Date("2025-11-27"),
    amount: 52.4,
    type: TransactionType.EXPENSE,
    category: TransactionCategory.FOOD,
  },
];

export default function useTransactions(filters?: TransactionFilters) {
  const [transactions, setTransactions] =
    useState<Transaction[]>(initialTransactions);
  const [currentPage, setCurrentPage] = useState(1);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
    setCurrentPage(1);
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === transaction.id ? transaction : t))
    );
  };

  const normalizeDate = (date: Date): Date => {
    // Create a new date with only the date components (no time) in local timezone
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const applyFilters = (transactions: Transaction[]): Transaction[] => {
    if (!filters) return transactions;

    return transactions.filter((transaction) => {
      // Filter by category
      if (filters.category && transaction.category !== filters.category) {
        return false;
      }

      // Filter by date range
      if (filters.dateRange) {
        const transactionDate = normalizeDate(new Date(transaction.date));

        if (filters.dateRange.from) {
          const fromDate = normalizeDate(new Date(filters.dateRange.from));
          if (transactionDate < fromDate) {
            return false;
          }
        }

        if (filters.dateRange.to) {
          const toDate = normalizeDate(new Date(filters.dateRange.to));
          if (transactionDate > toDate) {
            return false;
          }
        }
      }

      return true;
    });
  };

  const filteredTransactions = applyFilters(transactions);

  const sortedTransactions = filteredTransactions.sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTransactions = sortedTransactions.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return {
    transactions: paginatedTransactions,
    allTransactions: sortedTransactions,
    addTransaction,
    updateTransaction,
    pagination: {
      currentPage,
      totalPages,
      totalItems: sortedTransactions.length,
      itemsPerPage: ITEMS_PER_PAGE,
      goToPage,
      nextPage,
      previousPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}
