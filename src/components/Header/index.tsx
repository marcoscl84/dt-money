import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from "../../assets/logo-dt.png";
import * as Dialog from "@radix-ui/react-dialog";

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

        <Dialog.Portal>
          <Dialog.Overlay />

          <Dialog.Content>
            <Dialog.Title>Nova transação</Dialog.Title>

            <Dialog.Close />
          </Dialog.Content>
        </Dialog.Portal>
      </HeaderContent>
    </HeaderContainer>
  );
}
