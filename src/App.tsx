import { BrowserRouter } from "react-router-dom";
import { Navigator } from "./components/Navigator";
import { Toast } from "./components/Toast";
import { ToastProvider } from "./hooks/useToast";
import MainRoutes from "./routes";
import { GlobalStyle } from "./styles/global";

export default function App() {
    return (
        <BrowserRouter>
            <ToastProvider>
                <div className="App">
                    <Navigator />
                    <MainRoutes />
                    {/* <Toast message="Estou testando..." option="success" /> */}
                    <GlobalStyle />
                    <Toast />
                </div>
            </ToastProvider>
        </BrowserRouter>
    );
}
