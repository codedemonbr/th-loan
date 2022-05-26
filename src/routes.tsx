import React from "react";
import { Route, Routes } from "react-router-dom";
import { DashboardPage } from "./pages/DashboardPage";
import { Details } from "./pages/Details";
import { Loan } from "./pages/Loan";
import { Profile } from "./pages/Profile";

const MainRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/loan" element={<Loan />} />
            <Route path="/details/:id" element={<Details />} />
        </Routes>
    );
};

export default MainRoutes;
