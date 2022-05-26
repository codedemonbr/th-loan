import { useState } from "react";
import Modal from "react-modal";
import { Dashboard } from "../../components/Dashboard";
import { Header } from "../../components/Header";
import { NewTransactionModal } from "../../components/NewTransactionModal";
import { TransactionsTable } from "../../components/TransactionsTable";
import { TransactionsProvider } from "../../hooks/useTransactions";

Modal.setAppElement("#root");

const DashboardPage: React.FC = () => {
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);

    const handleOpenNewTransactionModal = () => {
        setIsNewTransactionModalOpen(true);
    };

    const handleCloseNewTransactionModal = () => {
        setIsNewTransactionModalOpen(false);
    };
    return (
        <TransactionsProvider>
            <div id="modal">
                <Header
                    onOpenNewTransactionModal={handleOpenNewTransactionModal}
                />
                <Dashboard />
                <TransactionsTable />

                <NewTransactionModal
                    isOpen={isNewTransactionModalOpen}
                    onRequestClose={handleCloseNewTransactionModal}
                />
            </div>
        </TransactionsProvider>
    );
};

export { DashboardPage };
