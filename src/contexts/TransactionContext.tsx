import { createContext, ReactNode, useEffect, useState, useCallback } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface TransactionsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;
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
  const fetchTransactions = useCallback(async (query?: string) => {
    const response = await api.get("transactions", {
    params: {
      _sort: "createdAt",
      _order: "desc",
      q: query,
    },
  });

  setTransactions(response.data);
  // console.log(response.data);
}, []) 

  const createTransaction = useCallback(async (data: CreateTransactionInput) => {
    const response = await api.post("transactions", {
      description: data.description,
      category: data.category,
      price: data.price,
      type: data.type,
      createdAt: new Date(),
    });

    console.log(response.data);

    setTransactions((state) => [response.data, ...state]);
  }, [])

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}
