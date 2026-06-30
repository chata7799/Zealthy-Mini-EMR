import { FaHospital, FaSignOutAlt, FaUserCircle } from "react-icons/fa";

function Navbar({ patient }) {

    const logout = () => {

        localStorage.removeItem("patient");
        window.location.href = "/";

    };

    return (

        <nav className="navbar navbar-expand-lg bg-white shadow-sm">

            <div className="container">

                <span
                    className="navbar-brand fw-bold text-primary fs-3">

                    <FaHospital className="me-2"/>

                    Zealthy

                </span>

                <div
                    className="d-flex align-items-center">

                    <FaUserCircle
                        size={28}
                        className="text-secondary me-2"
                    />

                    <span className="fw-semibold me-4">

                        {patient?.patientName}

                    </span>

                    <button
                        className="btn btn-outline-danger"
                        onClick={logout}
                    >

                        <FaSignOutAlt className="me-2"/>

                        Logout

                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;