import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { api } from "../services/api";

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

    useEffect(() => {
        api.get("/loans")
            .then((response) => setLoans(response.data))
            .catch((error) => console.log(error));

        api.get("/limit")
            .then((response) => setLimits(response.data))
            .catch((error) => console.log(error));
    }, []);

    const createLoan = async (loanInput: LoanInput) => {
        let inicio = performance.now();
        const { data } = await api.post("/loans", { ...loanInput });
        console.log("tempo decorrido >>>" + (performance.now() - inicio));

        setLoans([...data]);
    };

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
