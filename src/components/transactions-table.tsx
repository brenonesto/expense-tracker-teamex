import { ChevronLeftIcon, ChevronRightIcon, EditIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Transaction, TransactionType } from "@/types/transaction";
import TransactionDialog from "./transaction-dialog";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface TransactionsTableProps {
  transactions: Transaction[];
  addTransaction?: (transaction: Transaction) => void;
  updateTransaction?: (transaction: Transaction) => void;
  pagination?: PaginationInfo;
}

export default function TransactionsTable({
  transactions,
  addTransaction,
  updateTransaction,
  pagination,
}: TransactionsTableProps) {
  const renderPaginationButtons = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { currentPage, totalPages, goToPage } = pagination;
    const pageButtons: (number | string)[] = [];

    pageButtons.push(1);

    const rangeStart = Math.max(2, currentPage - 1);
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1);

    if (rangeStart > 2) {
      pageButtons.push("...");
    }

    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageButtons.push(i);
    }

    if (rangeEnd < totalPages - 1) {
      pageButtons.push("...");
    }

    if (totalPages > 1) {
      pageButtons.push(totalPages);
    }

    return pageButtons.map((page) => {
      if (page === "...") {
        const prevPage = pageButtons[pageButtons.indexOf(page) - 1];
        return (
          <span
            key={`ellipsis-after-${prevPage}`}
            className="px-2 py-1 text-gray-500"
          >
            ...
          </span>
        );
      }

      return (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => goToPage(page as number)}
          className="min-w-[40px]"
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="space-y-4">
      <Table className="border border-gray-200 rounded-md text-center">
        <TableHeader>
          <TableRow className="divide-x divide-y divide-gray-200">
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Category</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.date.toISOString()}
              className={cn(
                transaction.type === TransactionType.EXPENSE && "bg-red-100",
                transaction.type === TransactionType.INCOME && "bg-green-100"
              )}
            >
              <TableCell>{transaction.date.toLocaleDateString()}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <TransactionDialog
                  transaction={transaction}
                  addTransaction={addTransaction ?? (() => {})}
                  updateTransaction={updateTransaction ?? (() => {})}
                  trigger={
                    <Button variant="outline" size="icon">
                      <EditIcon className="w-4 h-4" />
                    </Button>
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {pagination && pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
            to{" "}
            {Math.min(
              pagination.currentPage * pagination.itemsPerPage,
              pagination.totalItems
            )}{" "}
            of {pagination.totalItems} transactions
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={pagination.previousPage}
              disabled={!pagination.hasPreviousPage}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>

            {renderPaginationButtons()}

            <Button
              variant="outline"
              size="sm"
              onClick={pagination.nextPage}
              disabled={!pagination.hasNextPage}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
