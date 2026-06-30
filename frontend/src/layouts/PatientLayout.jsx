import Navbar from "../components/Navbar";

function PatientLayout({ patient, children }) {

    return (
        <>
            <Navbar patient={patient} />

            <div className="container py-4">
                {children}
            </div>
        </>
    );

}

export default PatientLayout;