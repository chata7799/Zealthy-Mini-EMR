import { useEffect, useState } from "react";

function PatientForm({ patient, onSave, onCancel }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    useEffect(() => {

        if (patient) {

            setFormData({
                name: patient.name || "",
                email: patient.email || "",
                password: patient.password || ""
            });

        }

    }, [patient]);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onSave(formData);

    };

    return (

        <div className="card shadow-sm mt-4">

            <div className="card-body">

                <h5 className="fw-bold">

                    {patient ? "Edit Patient" : "New Patient"}

                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label>Name</label>

                        <input
                            className="form-control"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label>Email</label>

                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-4">

                        <label>Password</label>

                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <button
                        className="btn btn-primary me-2"
                    >
                        {patient ? "Update" : "Save"}
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

export default PatientForm;