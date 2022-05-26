import React from "react";
import { useLoans } from "../../hooks/useLoans";
import { formatCurrency } from "../../utils/formatCurrency";
import { Container, Navigate, UnsuccessContainer } from "./styles";

const LoansTable: React.FC = () => {
    const { loans } = useLoans();

    return (
        <>
            <Container>
                {loans.length ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Quantidade de Prestações</th>
                                    <th>Valor</th>
                                    <th>Primeira Prestação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loans.map((loan) => {
                                    return (
                                        <tr key={loan.id}>
                                            <td>{loan.qtdParcelas}</td>
                                            <td>
                                                {formatCurrency(loan.valor)}
                                            </td>
                                            <td>{loan.primeiraParcela}</td>
                                            <td>
                                                <Navigate
                                                    to={`/details/${loan.id}`}
                                                >
                                                    <span>Pagar</span>
                                                </Navigate>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </>
                ) : (
                    <UnsuccessContainer>
                        <h1>Não há dados para exibir</h1>
                    </UnsuccessContainer>
                )}
            </Container>
        </>
    );
};

export { LoansTable };
