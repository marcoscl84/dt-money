import { Children, createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
}

interface TransactionProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext<TransactionsContextType>(
  {} as TransactionsContextType
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // FORMA PARA CHAMAR A REQUISIÇÃO UTILIZANDO ASYNC AWAIT E USEFFECT (QUE NÃO PODE SER ASSINCRONO):
  async function LoadTransactions() {
    const response = await fetch("http://localhost:3333/transactions");
    const data = await response.json();

    setTransactions(data);
    console.log(data);
  }

  useEffect(() => {
    LoadTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
