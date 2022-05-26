import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";
import { formatCurrency } from "../../utils/formatCurrency";
import { Container, PayButton, UnsuccessContainer } from "./styles";

interface IParcela {
    id: string;
    parcelaNumero: number;
    status: boolean;
    valorParcela: number;
    dataPagamento: string;
}

interface ILoanDTO {
    id: string;
    primeiraParcela: string;
    qtdParcelas: number;
    valor: number;
    parcelas: IParcela[];
}

const DetailsTable: React.FC = () => {
    const { id } = useParams();

    const [loan, setLoan] = useState<ILoanDTO>({} as ILoanDTO);

    const handleGetLoanDetails = useCallback(async () => {
        try {
            const { data } = await api.get(`/loans/${id}`);

            setLoan(data[0]);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    const handleUpdateStateClientSide = useCallback(
        (status: boolean, idParcel: string) => {
            let { parcelas } = loan;

            const modifiedParcel = {
                ...parcelas.filter((parcel) => parcel.id === idParcel)[0],
                status,
            };

            /** updating array parcels */
            let newParcels = parcelas.map((parcel) => {
                if (parcel.id === idParcel) {
                    return modifiedParcel;
                }
                return parcel;
            });

            let newLoan = { ...loan, parcelas: newParcels };

            setLoan(newLoan);
        },
        [loan]
    );

    const handlePayBill = useCallback(
        async (idParcel: string, status: boolean) => {
            try {
                const obj = { idParcel, status };
                api.patch(`/loans/pay/${id}`, obj);

                handleUpdateStateClientSide(status, idParcel);
            } catch (error) {
                console.log(error);
            }
        },
        [handleUpdateStateClientSide, id]
    );

    useEffect(() => {
        handleGetLoanDetails();
    }, [handleGetLoanDetails]);

    return (
        <>
            <Container>
                {!!loan && loan.parcelas ? (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>Número da Parcela</th>
                                    <th>Status</th>
                                    <th>Valor da Parcela</th>
                                    <th>Data Pagamento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loan.parcelas.map((loan) => {
                                    return (
                                        <tr key={loan.id}>
                                            <td>{loan.parcelaNumero}</td>
                                            <td>
                                                <PayButton
                                                    paid={loan.status}
                                                    onClick={() =>
                                                        handlePayBill(
                                                            loan.id,
                                                            !loan.status
                                                        )
                                                    }
                                                >
                                                    <span>
                                                        {loan.status
                                                            ? "pago"
                                                            : "pagar"}
                                                    </span>
                                                </PayButton>
                                            </td>
                                            <td>
                                                {formatCurrency(
                                                    loan.valorParcela
                                                )}
                                            </td>
                                            <td>{loan.dataPagamento}</td>
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

export { DetailsTable };
