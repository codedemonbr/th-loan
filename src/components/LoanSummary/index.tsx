import React from "react";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useLoans } from "../../hooks/useLoans";
import { formatCurrency } from "../../utils/formatCurrency";
import { Container } from "./styles";

const LoanSummary: React.FC = () => {
    const { limits } = useLoans();
    return (
        <>
            <Container>
                <div>
                    <header>
                        <p>Limite</p>
                        <img src={incomeImg} alt="limite " />
                    </header>
                    <strong>{formatCurrency(limits.limit)}</strong>
                </div>
                <div>
                    <header>
                        <p>Limite Usado</p>
                        <img src={outcomeImg} alt="limite usado" />
                    </header>
                    <strong>{formatCurrency(limits.usedLimit)}</strong>
                </div>
                <div className="highlight-background">
                    <header>
                        <p>Limite Disponível</p>
                        <img src={totalImg} alt="Total" />
                    </header>
                    <strong>{formatCurrency(limits.availableLimit)}</strong>
                </div>
            </Container>
        </>
    );
};

export { LoanSummary };
