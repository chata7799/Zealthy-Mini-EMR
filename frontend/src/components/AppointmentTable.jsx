import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAppointments } from "../services/appointmentService";
import AppointmentForm from "./AppointmentForm";
import { createAppointment } from "../services/appointmentService";
import { deleteAppointment } from "../services/appointmentService";
import { updateAppointment } from "../services/appointmentService";

function AppointmentTable({ patientId }) {

    const [appointments, setAppointments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAppointment, setEditingAppointment] = useState(null);
    useEffect(() => {

        loadAppointments();

    }, [patientId]);

    const loadAppointments = async () => {

        try {

            const data = await getAppointments(patientId);

            setAppointments(data);

        } catch (error) {

            console.error(error);

        }

    };

 
    const removeAppointment = async (appointmentId) => {

    const confirmed = window.confirm(
        "Are you sure you want to delete this appointment?"
    );

    if (!confirmed) {
        return;
    }

    try {

        await deleteAppointment(appointmentId);

        loadAppointments();

    } catch (error) {

        console.error(error);

        alert("Unable to delete appointment.");

    }

    };

    const saveAppointment = async (appointment) => {

    try {

        if (editingAppointment) {

            await updateAppointment(
                editingAppointment.id,
                appointment
            );

        } else {

            await createAppointment(
                patientId,
                appointment
            );

        }

        setEditingAppointment(null);

        setShowForm(false);

        loadAppointments();

    } catch (error) {

        console.error(error);

    }

};

    return (

        <div className="card shadow-sm border-0 rounded-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h5 className="fw-bold mb-0">

                        Appointments

                    </h5>

                   <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setShowForm(true)}
                    >
                        + Add Appointment
                    </button>

                </div>

                <table className="table table-hover align-middle">

                    <thead>

                    <tr>

                        <th>Provider</th>

                        <th>Date</th>

                        <th>Repeat</th>

                        <th width="180">

                            Actions

                        </th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        appointments.length === 0 ?

                            <tr>

                                <td
                                    colSpan="4"
                                    className="text-center text-muted"
                                >

                                    No appointments found.

                                </td>

                            </tr>

                            :

                            appointments.map(app => (

                                <tr key={app.id}>

                                    <td>

                                        {app.provider}

                                    </td>

                                    <td>

                                        {

                                            new Date(
                                                app.datetime
                                            ).toLocaleString()

                                        }

                                    </td>

                                    <td>

                                        <span className="badge bg-primary">

                                            {app.repeat}

                                        </span>

                                    </td>

                                    <td>
                <button
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => {

                                setEditingAppointment(app);

                                setShowForm(true);

                            }}
                        >

                            Edit

                        </button>

                 <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeAppointment(app.id)}
                >
                    Delete
                </button>

                                    </td>

                                </tr>

                            ))

                    }

                    </tbody>

                </table>
                

                {
                    showForm && (

                      <AppointmentForm
                            appointment={editingAppointment}
                            onSave={saveAppointment}
                            onCancel={() => {
                                setEditingAppointment(null);
                                setShowForm(false);
                            }}
                        />

                    )
                }


            </div>

        </div>

    );

}

export default AppointmentTable;