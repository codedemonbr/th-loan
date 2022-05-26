import React, { useCallback, useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "../../components/Dashboard";
import { LoanHeader } from "../../components/LoanHeader";
import { LoansTable } from "../../components/LoansTable";
import { NewLoanModal } from "../../components/NewLoanModal";
import { LoansProvider } from "../../hooks/useLoans";

Modal.setAppElement("#root");

const Loan: React.FC = () => {
    const [isNewLoanModalOpen, setIsNewLoanModalOpen] = useState(false);
    const handleOpenNewLoanModal = useCallback(() => {
        setIsNewLoanModalOpen(true);
    }, []);
    const handleCloseNewLoanModal = useCallback(() => {
        setIsNewLoanModalOpen(false);
    }, []);
    return (
        <>
            <LoansProvider>
                <LoanHeader onOpenNewLoanModal={handleOpenNewLoanModal} />
                <Dashboard isLoan />
                <LoansTable />
                <NewLoanModal
                    isOpen={isNewLoanModalOpen}
                    onRequestClose={handleCloseNewLoanModal}
                />
            </LoansProvider>
        </>
    );
};

export { Loan };
