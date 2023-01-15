import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import {
  PriceHighLight,
  TransactionsContainer,
  TransactionsTable,
} from "./styles";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

export function Transactions() {
  // useEffect(() => {
  // fetch("http://localhost:3333/transactions").then((response) => {
  //   response.json().then((data) => {
  //     console.log(data);
  //   });
  // });

  // OUTRA FORMA DE SINTAXE PARA PROMISES THEN:
  // fetch("http://localhost:3333/transactions")
  // .then((response) => response.json())
  // .then((data) => {
  //   console.log(data);
  // })
  // }, []);

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
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.price}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{transaction.createdAt}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
