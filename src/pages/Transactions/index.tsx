import { useContext } from "react";
import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/Header";
import { SearchForm } from "../../components/SearchForm";
import { Summary } from "../../components/Summary";
import { TransactionsContext } from "../../contexts/TransactionContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
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

  const transactions = useContextSelector(TransactionsContext, (context: any) => {
    return context.transactions
  });

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />

        <TransactionsTable>
          <tbody>
            {transactions.map((transaction: any) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === "outcome" && "- "}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
