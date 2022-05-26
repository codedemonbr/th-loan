import React from "react";
import logoImg from "../../assets/logo.svg";
import { Container, Content } from "./styles";

interface LoanHeaderProps {
    onOpenNewLoanModal: () => void;
}

const LoanHeader: React.FC<LoanHeaderProps> = ({ onOpenNewLoanModal }) => {
    return (
        <Container>
            <Content>
                <>
                    <img src={logoImg} alt="th-loan" />

                    <button type="button" onClick={onOpenNewLoanModal}>
                        Novo empréstimo
                    </button>
                </>
            </Content>
        </Container>
    );
};

export { LoanHeader };
