import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { getPatientById } from "../services/patientService";
import AppointmentTable from "../components/AppointmentTable";
import PrescriptionTable from "../components/PrescriptionTable";

function PatientDetails() {

    const { id } = useParams();

    const [patient, setPatient] = useState(null);

    useEffect(() => {
        loadPatient();
    }, []);

    const loadPatient = async () => {

        try {

            const data = await getPatientById(id);

            setPatient(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!patient) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2 className="fw-bold">

                    Patient Details

                </h2>

                <Link
                    to="/admin"
                    className="btn btn-secondary"
                >
                    Back
                </Link>

            </div>

            <div className="card shadow-sm border-0 rounded-4 mb-4">

                <div className="card-body">

                    <h3 className="fw-bold">

                        {patient.name}

                    </h3>

                    <p className="mb-0">

                        <strong>Email:</strong> {patient.email}

                    </p>

                </div>

            </div>

            <AppointmentTable patientId={id} />

           <div className="mt-4">

                <PrescriptionTable patientId={id} />

            </div>

        </div>

    );

}

export default PatientDetails;