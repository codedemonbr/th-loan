import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
interface ToastProps {
    message: string;
    option: "success" | "info" | "warning" | "error";
}

/**Criar hook disso */
const Toast: React.FC<ToastProps> = ({ message, option }) => {
    const addNotification = () => {
        toast(message, {
            type: option,
        });
    };
    return (
        <div className="App">
            <button onClick={addNotification}>Add notificaiton</button>
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <a href=""></a>
        </div>
    );
};

export { Toast };
