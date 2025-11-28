import { useId, useState } from "react";
import {
  type Transaction,
  TransactionCategory,
  TransactionType,
} from "@/types/transaction";
import { generateTransactionId } from "@/utils/helpers";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TransactionDialogProps {
  transaction?: Transaction;
  addTransaction?: (transaction: Transaction) => void;
  updateTransaction?: (transaction: Transaction) => void;
  trigger?: React.ReactNode;
}

export default function TransactionDialog({
  transaction,
  addTransaction,
  updateTransaction,
  trigger,
}: TransactionDialogProps) {
  const isEditMode = !!transaction;
  const dateId = useId();
  const amountId = useId();
  const typeId = useId();
  const categoryId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    transaction?.date ?? undefined
  );
  const [amount, setAmount] = useState<number | undefined>(
    transaction?.amount ?? undefined
  );
  const [type, setType] = useState<TransactionType | undefined>(
    transaction?.type ?? undefined
  );
  const [category, setCategory] = useState<TransactionCategory | undefined>(
    transaction?.category ?? undefined
  );

  const handleSave = () => {
    if (!date || !amount || !type || !category) return;
    if (isEditMode) {
      updateTransaction?.({
        id: transaction?.id,
        date,
        amount,
        type,
        category,
      });
    } else {
      addTransaction?.({
        id: generateTransactionId(),
        date,
        amount,
        type,
        category,
      });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button>{isEditMode ? "Edit" : "Create"} Transaction</Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit" : "Create"} Transaction
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor={dateId} className="mb-1">
                Date
              </Label>
              <Input
                type="date"
                id={dateId}
                value={
                  date
                    ? `${date.getFullYear()}-${String(
                        date.getMonth() + 1
                      ).padStart(2, "0")}-${String(date.getDate()).padStart(
                        2,
                        "0"
                      )}`
                    : ""
                }
                onChange={(e) => {
                  const [year, month, day] = e.target.value
                    .split("-")
                    .map(Number);
                  setDate(new Date(year, month - 1, day));
                }}
              />
            </div>
            <div className="w-full">
              <Label htmlFor={amountId} className="mb-1">
                Amount
              </Label>
              <Input
                type="number"
                id={amountId}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                onFocus={(e) => e.target.select()}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Label htmlFor={typeId} className="mb-1">
                Type
              </Label>
              <Select
                value={type}
                onValueChange={(value) => setType(value as TransactionType)}
              >
                <SelectTrigger className="w-full" id={typeId}>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={TransactionType.INCOME}>Income</SelectItem>
                  <SelectItem value={TransactionType.EXPENSE}>
                    Expense
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full">
              <Label htmlFor={categoryId} className="mb-1">
                Category
              </Label>
              <Select
                value={category}
                onValueChange={(value) =>
                  setCategory(value as TransactionCategory)
                }
              >
                <SelectTrigger className="w-full" id={categoryId}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(TransactionCategory).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>
            {isEditMode ? "Update" : "Create"} Transaction
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
