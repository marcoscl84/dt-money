import { useContext } from "react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../contexts/TransactionContext";
import { useMemo } from "react";

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context: any) => {
    return context.transactions
  });

  // { income: 0, outcome: 0, total:0}
  const summary = useMemo(() => {
    return transactions.reduce(
      (accumulator: any, transaction: any) => {
        if (transaction.type === "income") {
          accumulator.income += transaction.price;
          accumulator.total += transaction.price;
        } else {
          accumulator.outcome += transaction.price;
          accumulator.total -= transaction.price;
        }
  
        return accumulator;
      },
      { income: 0, outcome: 0, total: 0 }
    );
  }, [transactions])

  return summary;
}
