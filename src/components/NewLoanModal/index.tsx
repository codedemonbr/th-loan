import React, { FormEvent, useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import closeImg from "../../assets/close.svg";
import { useLoans } from "../../hooks/useLoans";
import { api } from "../../services/api";
import { firstParcel } from "../../utils/firstParcelDate";
import { formatCurrency } from "../../utils/formatCurrency";
import maskMonetary from "../../utils/maskMonetary";
import { unMaskMonetary } from "../../utils/unMaskMonetary";
import {
    BestDateContainer,
    Container,
    LabelContainer,
    LoanSelector,
    LoanSelectorContainer,
    RadioBox,
} from "./styles";

interface IInstallmentDTO {
    valorDesejado: number;
    valorParcela: string;
    qtdParcelas: number;
    taxadeJuros: number;
}

interface NewLoanModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

const NewLoanModal: React.FC<NewLoanModalProps> = ({
    isOpen,
    onRequestClose,
}) => {
    const bestPossibleDays = [5, 10, 15, 20, 25];
    /** States */
    const [amount, setAmount] = useState(formatCurrency(0));
    const [bestDate, setBestDate] = useState(5);
    const [installments, setInstallments] = useState<IInstallmentDTO[]>(
        [] as IInstallmentDTO[]
    );
    const [selectedInstallment, setSelectedInstallment] =
        useState<IInstallmentDTO>({} as IInstallmentDTO);
    const [lockParcelButton, setLockParcelButton] = useState(true);
    const [isSelectingParcel, setIsSelectingParcel] = useState(false);

    /** Custom hooks */
    const { createLoan, limits, setLimits } = useLoans();

    const handleCleanSimulation = useCallback(() => {
        setBestDate(5);
        setAmount(formatCurrency(0));
        setSelectedInstallment({
            valorDesejado: 0,
            valorParcela: "",
            qtdParcelas: 0,
            taxadeJuros: 0,
        });
        setIsSelectingParcel(false);
    }, []);

    const handleCreateNewLoan = useCallback(
        async (event: FormEvent) => {
            try {
                event.preventDefault();

                const obj = {
                    valor: unMaskMonetary(amount),
                    qtdParcelas: selectedInstallment.qtdParcelas,
                    primeiraParcela: firstParcel(bestDate),
                };
                if (unMaskMonetary(amount) <= limits.availableLimit) {
                    await createLoan(obj);
                    setLimits({
                        ...limits,
                        availableLimit: limits.availableLimit - obj.valor,
                        usedLimit: obj.valor + limits.usedLimit,
                    });
                    onRequestClose();
                } else {
                    handleCleanSimulation();
                }
            } catch (error) {
                console.log(error);
                onRequestClose();
            }
        },
        [
            amount,
            bestDate,
            createLoan,
            handleCleanSimulation,
            limits,
            onRequestClose,
            selectedInstallment.qtdParcelas,
            setLimits,
        ]
    );

    const handleSimulateLoan = useCallback(async () => {
        try {
            const value = unMaskMonetary(amount);
            const { data } = await api.get(
                `/installments?desiredValue=${value}`
            );
            const { parcelas } = data;

            setInstallments(parcelas);
            /**using as standard value the higher number of installment */

            const higherValue = parcelas.reduce(
                (previous: IInstallmentDTO, current: IInstallmentDTO) =>
                    previous.qtdParcelas > current.qtdParcelas
                        ? previous
                        : current
            );
            setSelectedInstallment(higherValue);
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }, [amount]);
    /** Cleaning values when we close the modal */
    useEffect(() => {
        if (!isOpen) {
            handleCleanSimulation();
        }
    }, [handleCleanSimulation, isOpen]);

    return (
        <>
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                overlayClassName="react-modal-overlay"
                className="react-modal-content"
            >
                <button
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                >
                    <img src={closeImg} alt="Fechar modal" />
                </button>
                {isSelectingParcel ? (
                    <>
                        <LoanSelectorContainer>
                            {!!installments &&
                                installments.map((installment) => (
                                    <LoanSelector
                                        key={installment.valorParcela}
                                        type="button"
                                        onClick={() => {
                                            setSelectedInstallment(installment);
                                            setIsSelectingParcel(false);
                                        }}
                                    >
                                        <span>{`${
                                            installment.qtdParcelas
                                        }x de ${formatCurrency(
                                            +installment.valorParcela
                                        )}`}</span>
                                    </LoanSelector>
                                ))}
                        </LoanSelectorContainer>
                    </>
                ) : (
                    <>
                        <Container onSubmit={handleCreateNewLoan}>
                            <h2>Solicite um novo empréstimo</h2>

                            <LabelContainer>
                                <h3>Valor:</h3>
                            </LabelContainer>

                            <input
                                type="text"
                                placeholder="Valor"
                                value={amount}
                                onChange={(event) => {
                                    const { value } = event.target;
                                    setAmount(maskMonetary(value));
                                }}
                                onBlur={() => {
                                    const value = unMaskMonetary(amount);

                                    if (value >= 1) {
                                        handleSimulateLoan();
                                        setLockParcelButton(false);
                                    } else {
                                        setLockParcelButton(true);
                                        setSelectedInstallment({
                                            ...selectedInstallment,
                                            qtdParcelas: 0,
                                        });
                                    }
                                }}
                            />

                            <LabelContainer>
                                <h3>Simule agora:</h3>
                            </LabelContainer>

                            <LoanSelectorContainer>
                                <LoanSelector
                                    type="button"
                                    onClick={() => {
                                        setIsSelectingParcel(true);
                                    }}
                                    disabled={lockParcelButton}
                                >
                                    <span>
                                        {!!selectedInstallment.qtdParcelas
                                            ? `${
                                                  selectedInstallment.qtdParcelas
                                              }x de ${formatCurrency(
                                                  +selectedInstallment.valorParcela
                                              )}`
                                            : "Para simular basta clicar aqui!"}
                                    </span>
                                </LoanSelector>
                            </LoanSelectorContainer>

                            <LabelContainer>
                                <h3>Melhor data de vencimento:</h3>
                            </LabelContainer>

                            <BestDateContainer>
                                {/* Refatorar */}
                                {bestPossibleDays.map((item) => (
                                    <RadioBox
                                        key={item}
                                        type="button"
                                        isActive={bestDate === item}
                                        onClick={() => {
                                            setBestDate(item);
                                        }}
                                    >
                                        <span>{item}</span>
                                    </RadioBox>
                                ))}
                            </BestDateContainer>

                            {!!selectedInstallment.qtdParcelas &&
                                !lockParcelButton && (
                                    <>
                                        <button type="submit">Contratar</button>
                                    </>
                                )}
                        </Container>
                    </>
                )}
            </Modal>
        </>
    );
};

export { NewLoanModal };
