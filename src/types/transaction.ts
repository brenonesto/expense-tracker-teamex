export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export enum TransactionCategory {
  FOOD = "food",
  TRANSPORT = "transport",
  HOUSING = "housing",
  UTILITIES = "utilities",
  ENTERTAINMENT = "entertainment",
}

export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
};

export type TransactionFilters = {
  category?: TransactionCategory;
  dateRange?: {
    from?: Date;
    to?: Date;
  };
};
