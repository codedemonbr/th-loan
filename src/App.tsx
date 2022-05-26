import { BrowserRouter } from "react-router-dom";
import { Navigator } from "./components/Navigator";
import MainRoutes from "./routes";
import { GlobalStyle } from "./styles/global";

export default function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navigator />
                <MainRoutes />
                {/* <Toast message="Estou testando..." option="success" /> */}
            </div>
            <GlobalStyle />
        </BrowserRouter>
    );
}
