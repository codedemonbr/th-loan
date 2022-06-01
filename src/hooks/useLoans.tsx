import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";
import { api } from "../services/api";
import { useToast } from "./useToast";

interface Loan {
    id: string;
    valor: number;
    qtdParcelas: number;
    primeiraParcela: string;
}

interface ILimitDTO {
    limit: number;
    usedLimit: number;
    availableLimit: number;
}

interface LoansProviderProps {
    children: ReactNode;
}

type LoanInput = Omit<Loan, "id">;

interface LoansContextData {
    loans: Loan[];
    limits: ILimitDTO;
    setLimits: Dispatch<SetStateAction<ILimitDTO>>;
    createLoan: (loan: LoanInput) => Promise<void>;
}

const LoansContext = createContext<LoansContextData>({} as LoansContextData);

export function LoansProvider({ children }: LoansProviderProps) {
    const [loans, setLoans] = useState<Loan[]>([]);
    const [limits, setLimits] = useState<ILimitDTO>({
        limit: 0,
        usedLimit: 0,
        availableLimit: 0,
    });
    const { setToastConfig } = useToast();

    useEffect(() => {
        api.get("/loans")
            .then((response) => {
                setLoans(response.data);

                setToastConfig({
                    message: `Empréstimos carregados com sucesso!`,
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

        api.get("/limit")
            .then((response) => {
                setLimits(response.data);

                setToastConfig({
                    message: `Limites carregados com sucesso!`,
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

    const createLoan = useCallback(
        async (loanInput: LoanInput) => {
            try {
                let inicio = performance.now();
                const { data } = await api.post("/loans", { ...loanInput });
                console.log(
                    "tempo decorrido >>>" + (performance.now() - inicio)
                );
                setToastConfig({
                    message: `Empréstimo criado com sucesso!`,
                    option: "success",
                    trigger: true,
                });
                setLoans([...data]);
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
        },
        [setToastConfig]
    );
    return (
        <LoansContext.Provider value={{ loans, limits, setLimits, createLoan }}>
            {children}
        </LoansContext.Provider>
    );
}

export function useLoans() {
    const context = useContext(LoansContext);
    return context;
}
