import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../contexts/TransactionContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

/* 
  Porque um componente renderiza?

  - Hooks changed (mudou estado, contexto, reducer)
  - Props changed (mudou propriedas)
  - Parent rerendered (componente pai renderizou)

  Fluxo de renderezição:

    1º React recria o HTML da interface daquele componente
    2º Compara a versão recriada do HTML com a versão anterior
    3º Se algo mudou, reescreve o HTML na tela

    Memo: 
    
    0º (ocorre antes dos passos anteriores) Hooks changed, Props changed (deep comparison)
    0.1º Compara versão anterior dos hooks e props
    0.2º Se algo mudou, permitirá a renderização

    * Só vale a pena utilizar o memo, quando o HTML a ser renderizado for muito pesado
*/

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(TransactionsContext, (context: any) =>{
    return context.fetchTransactions
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  async function handleSearchTransactions(data: SearchFormInputs) {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    await fetchTransactions(data.query);

    console.log(data);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register("query")}
      ></input>

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
 
export const SearchForm = memo(SearchFormComponent)