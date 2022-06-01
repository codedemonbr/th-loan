import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import { api } from "../services/api";
import { useToast } from "./useToast";

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

type TransactionInput = Omit<Transaction, "id" | "createdAt">;

// type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'>

interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { setToastConfig } = useToast();
    useEffect(() => {
        api.get("/transactions")
            .then((response) => {
                setTransactions(response.data.transactions);
                setToastConfig({
                    message: `Transações carregadas com sucesso!`,
                    option: "success",
                    trigger: true,
                });
            })
            .catch((error) => {
                setToastConfig({
                    //@ts-ignore
                    message: error?.message
                        ? //@ts-ignore
                          error?.message
                        : "Por favor tente novamente mais tarde",
                    option: "error",
                    trigger: true,
                });
            });
    }, [setToastConfig]);

    const createTransaction = async (transactionInput: TransactionInput) => {
        try {
            const response = await api.post("/transactions", {
                ...transactionInput,
                createdAt: new Date(),
            });
            setToastConfig({
                message: `Transação criada com sucesso!`,
                option: "success",
                trigger: true,
            });

            const { data } = response;

            setTransactions([...data]);
        } catch (error) {
            setToastConfig({
                //@ts-ignore
                message: error?.message
                    ? //@ts-ignore
                      error?.message
                    : "Por favor tente novamente mais tarde",
                option: "error",
                trigger: true,
            });
        }
    };

    return (
        <TransactionsContext.Provider
            value={{ transactions, createTransaction }}
        >
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
}
