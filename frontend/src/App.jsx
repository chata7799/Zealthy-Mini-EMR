import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import PatientList from "./admin/PatientList";
import PatientDetails from "./admin/PatientDetails";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Patient Portal */}
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/prescriptions" element={<Prescriptions />} />

                <Route path="/admin" element={<PatientList />} />
                <Route path="/admin/patient/:id" element={<PatientDetails />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;