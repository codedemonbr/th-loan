import { FC } from "react";
import { LoanSummary } from "../LoanSummary";
import { Summary } from "../Summary";
import { Container } from "./styles";

interface DashboardProps {
    isLoan?: boolean;
}

export const Dashboard: FC<DashboardProps> = ({ isLoan = false }) => {
    return (
        <>
            <Container>{isLoan ? <LoanSummary /> : <Summary />}</Container>
        </>
    );
};
