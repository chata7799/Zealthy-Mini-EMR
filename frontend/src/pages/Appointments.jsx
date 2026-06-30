import { useEffect, useState } from "react";
import PatientLayout from "../layouts/PatientLayout";
import { getAppointments } from "../services/appointmentService";

function Appointments() {

    const [appointments, setAppointments] = useState([]);
    const [patient, setPatient] = useState(null);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {

        try {

            const storedPatient = JSON.parse(
                localStorage.getItem("patient")
            );

            setPatient(storedPatient);

            const data = await getAppointments(storedPatient.id);

            setAppointments(data);

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

                        My Appointments

                    </h2>

                    <p className="text-muted">

                        View all your upcoming appointments.

                    </p>

                </div>

            </div>

            <div className="card border-0 shadow-sm rounded-4">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead>

                        <tr>

                            <th>Provider</th>

                            <th>Date & Time</th>

                            <th>Repeat</th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            appointments.map((appointment) => (

                                <tr key={appointment.id}>

                                    <td>

                                        {appointment.provider}

                                    </td>

                                    <td>

                                        {

                                            new Date(
                                                appointment.datetime
                                            ).toLocaleString()

                                        }

                                    </td>

                                    <td>

                                        <span className="badge bg-primary">

                                            {appointment.repeat}

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

export default Appointments;