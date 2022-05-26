import React from "react";
import { Container, Navigate } from "./styles";

const Navigator: React.FC = () => {
    return (
        <>
            <Container>
                <Navigate to="/">Home</Navigate>
                <Navigate to="/loan">Empréstimo</Navigate>
            </Container>
        </>
    );
};

export { Navigator };
