import { useEffect, useState } from "react";
import PatientLayout from "../layouts/PatientLayout";
import { getPrescriptions } from "../services/prescriptionService";

function Prescriptions() {

    const [prescriptions, setPrescriptions] = useState([]);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        loadPrescriptions();
    }, []);

    const loadPrescriptions = async () => {

        try {

            const storedPatient = JSON.parse(
                localStorage.getItem("patient")
            );

            setPatient(storedPatient);

            const data = await getPrescriptions(storedPatient.id);

            setPrescriptions(data);

        } catch (error) {

            console.error(error);

        }

    };

    if (!patient) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <PatientLayout patient={patient}>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        My Prescriptions

                    </h2>

                    <p className="text-muted">

                        View all your active prescriptions.

                    </p>

                </div>

            </div>

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead>

                        <tr>

                            <th>Medication</th>
                            <th>Dosage</th>
                            <th>Quantity</th>
                            <th>Refill Date</th>
                            <th>Schedule</th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            prescriptions.map((prescription) => (

                                <tr key={prescription.id}>

                                    <td>

                                        {prescription.medication}

                                    </td>

                                    <td>

                                        {prescription.dosage}

                                    </td>

                                    <td>

                                        {prescription.quantity}

                                    </td>

                                    <td>

                                        {prescription.refillOn}

                                    </td>

                                    <td>

                                        <span className="badge bg-success">

                                            {prescription.refillSchedule}

                                        </span>

                                    </td>

                                </tr>

                            ))

                        }

                        </tbody>

                    </table>

                </div>

            </div>

        </PatientLayout>

    );

}

export default Prescriptions;