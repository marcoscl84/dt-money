import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from '../../assets/logo-dt.png'

export function Header(){
    return(
        <HeaderContainer>
            <HeaderContent>
                <img src={logoImg} alt=''></img>

                <NewTransactionButton>Nova transação</NewTransactionButton>
            </HeaderContent>
        </HeaderContainer>
    )
}