import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PatientForm from "./PatientForm";

import {
    getAllPatients,
    createPatient,
    updatePatient
} from "../services/patientService";

function PatientList() {

    const [patients, setPatients] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [editingPatient, setEditingPatient] = useState(null);

    useEffect(() => {

        loadPatients();

    }, []);

    const loadPatients = async () => {

        try {

            const data = await getAllPatients();

            setPatients(data);

        } catch (error) {

            console.error(error);

        }

    };

    const savePatient = async (patient) => {

        try {

            if (editingPatient) {

                await updatePatient(
                    editingPatient.id,
                    patient
                );

            } else {

                await createPatient(patient);

            }

            setEditingPatient(null);

            setShowForm(false);

            loadPatients();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="container py-4">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold">

                        Mini EMR

                    </h2>

                    <p className="text-muted">

                        Patient Management

                    </p>

                </div>

                <button
                    className="btn btn-primary"
                    onClick={() => {

                        setEditingPatient(null);

                        setShowForm(true);

                    }}
                >

                    + New Patient

                </button>

            </div>

            <div className="card shadow-sm border-0 rounded-4">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead>

                        <tr>

                            <th>Name</th>

                            <th>Email</th>

                            <th width="220">

                                Actions

                            </th>

                        </tr>

                        </thead>

                        <tbody>

                        {

                            patients.map(patient => (

                                <tr key={patient.id}>

                                    <td>

                                        {patient.name}

                                    </td>

                                    <td>

                                        {patient.email}

                                    </td>

                                    <td>

                                        <Link
                                            to={`/admin/patient/${patient.id}`}
                                            className="btn btn-outline-primary btn-sm me-2"
                                        >

                                            View

                                        </Link>

                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => {

                                                setEditingPatient(patient);

                                                setShowForm(true);

                                            }}
                                        >

                                            Edit

                                        </button>

                                    </td>

                                </tr>

                            ))

                        }

                        </tbody>

                    </table>

                </div>

            </div>

            {

                showForm && (

                    <PatientForm

                        patient={editingPatient}

                        onSave={savePatient}

                        onCancel={() => {

                            setEditingPatient(null);

                            setShowForm(false);

                        }}

                    />

                )

            }

        </div>

    );

}

export default PatientList;