import { useEffect, useState } from "react";

import PrescriptionForm from "./PrescriptionForm";

import {
    getPrescriptions,
    createPrescription,
    updatePrescription,
    deletePrescription
} from "../services/prescriptionService";

function PrescriptionTable({ patientId }) {

    const [prescriptions, setPrescriptions] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingPrescription, setEditingPrescription] = useState(null);

    useEffect(() => {

        loadPrescriptions();

    }, [patientId]);

    const loadPrescriptions = async () => {

        try {

            const data = await getPrescriptions(patientId);

            setPrescriptions(data);

        } catch (error) {

            console.error(error);

        }

    };

    const savePrescription = async (prescription) => {

        try {

            if (editingPrescription) {

                await updatePrescription(
                    editingPrescription.id,
                    prescription
                );

            } else {

                await createPrescription(
                    patientId,
                    prescription
                );

            }

            setEditingPrescription(null);
            setShowForm(false);

            loadPrescriptions();

        } catch (error) {

            console.error(error);

        }

    };

    const removePrescription = async (id) => {

        const confirmed = window.confirm(
            "Delete this prescription?"
        );

        if (!confirmed) return;

        try {

            await deletePrescription(id);

            loadPrescriptions();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="card shadow-sm border-0 rounded-4 mt-4">

            <div className="card-body">

                <div className="d-flex justify-content-between align-items-center mb-3">

                    <h5 className="fw-bold mb-0">

                        Prescriptions

                    </h5>

                    <button
                        className="btn btn-success btn-sm"
                        onClick={() => {

                            setEditingPrescription(null);
                            setShowForm(true);

                        }}
                    >

                        + Add Prescription

                    </button>

                </div>

                <table className="table table-hover align-middle">

                    <thead>

                    <tr>

                        <th>Medication</th>
                        <th>Dosage</th>
                        <th>Quantity</th>
                        <th>Refill</th>
                        <th>Schedule</th>
                        <th width="170">Actions</th>

                    </tr>

                    </thead>

                    <tbody>

                    {

                        prescriptions.length === 0 ?

                            <tr>

                                <td
                                    colSpan="6"
                                    className="text-center text-muted"
                                >

                                    No prescriptions found.

                                </td>

                            </tr>

                            :

                            prescriptions.map(p => (

                                <tr key={p.id}>

                                    <td>{p.medication}</td>

                                    <td>{p.dosage}</td>

                                    <td>{p.quantity}</td>

                                    <td>{p.refillOn}</td>

                                    <td>

                                        <span className="badge bg-success">

                                            {p.refillSchedule}

                                        </span>

                                    </td>

                                    <td>

                                        <button
                                            className="btn btn-warning btn-sm me-2"
                                            onClick={() => {

                                                setEditingPrescription(p);

                                                setShowForm(true);

                                            }}
                                        >

                                            Edit

                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                removePrescription(p.id)
                                            }
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

                        <PrescriptionForm

                            prescription={editingPrescription}

                            onSave={savePrescription}

                            onCancel={() => {

                                setEditingPrescription(null);

                                setShowForm(false);

                            }}

                        />

                    )

                }

            </div>

        </div>

    );

}

export default PrescriptionTable;