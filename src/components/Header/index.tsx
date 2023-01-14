import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from "../../assets/logo-dt.png";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt=""></img>

        <Dialog.Trigger asChild>
          <Dialog.Root>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Root>
        </Dialog.Trigger>

        <NewTransactionModal />
      </HeaderContent>
    </HeaderContainer>
  );
}
