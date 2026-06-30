import { useEffect, useState } from "react";

function PrescriptionForm({ prescription, onSave, onCancel }) {

    const [formData, setFormData] = useState({
        medication: "",
        dosage: "",
        quantity: 1,
        refillOn: "",
        refillSchedule: "monthly"
    });

    useEffect(() => {

        if (prescription) {

            setFormData({
                medication: prescription.medication || "",
                dosage: prescription.dosage || "",
                quantity: prescription.quantity || 1,
                refillOn: prescription.refillOn || "",
                refillSchedule: prescription.refillSchedule || "monthly"
            });

        }

    }, [prescription]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <h5 className="fw-bold mb-4">

                    {prescription ? "Edit Prescription" : "Add Prescription"}

                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Medication

                        </label>

                        <input
                            className="form-control"
                            name="medication"
                            value={formData.medication}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Dosage

                        </label>

                        <input
                            className="form-control"
                            name="dosage"
                            value={formData.dosage}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Quantity

                        </label>

                        <input
                            type="number"
                            min="1"
                            className="form-control"
                            name="quantity"
                            value={formData.quantity}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Refill Date

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="refillOn"
                            value={formData.refillOn}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Refill Schedule

                        </label>

                        <select
                            className="form-select"
                            name="refillSchedule"
                            value={formData.refillSchedule}
                            onChange={handleChange}
                        >

                            <option value="monthly">

                                Monthly

                            </option>

                            <option value="quarterly">

                                Quarterly

                            </option>

                            <option value="yearly">

                                Yearly

                            </option>

                        </select>

                    </div>

                    <button
                        className="btn btn-primary me-2"
                        type="submit"
                    >

                        {prescription ? "Update" : "Save"}

                    </button>

                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >

                        Cancel

                    </button>

                </form>

            </div>

        </div>

    );

}

export default PrescriptionForm;