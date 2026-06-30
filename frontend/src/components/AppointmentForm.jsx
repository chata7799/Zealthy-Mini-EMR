import { useEffect, useState } from "react";

function AppointmentForm({ appointment, onSave, onCancel }) {

    const [formData, setFormData] = useState({
        provider: "",
        datetime: "",
        repeat: "weekly",
        repeatUntil: ""
    });

    useEffect(() => {

        if (appointment) {

            setFormData({
                provider: appointment.provider || "",
                datetime: appointment.datetime
                    ? appointment.datetime.substring(0, 16)
                    : "",
                repeat: appointment.repeat || "weekly",
                repeatUntil: appointment.repeatUntil || ""
            });

        } else {

            setFormData({
                provider: "",
                datetime: "",
                repeat: "weekly",
                repeatUntil: ""
            });

        }

    }, [appointment]);

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

                    {appointment ? "Edit Appointment" : "Add Appointment"}

                </h5>

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Provider

                        </label>

                        <input
                            type="text"
                            className="form-control"
                            name="provider"
                            value={formData.provider}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Appointment Date & Time

                        </label>

                        <input
                            type="datetime-local"
                            className="form-control"
                            name="datetime"
                            value={formData.datetime}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Repeat Schedule

                        </label>

                        <select
                            className="form-select"
                            name="repeat"
                            value={formData.repeat}
                            onChange={handleChange}
                        >

                            <option value="none">None</option>

                            <option value="weekly">Weekly</option>

                            <option value="monthly">Monthly</option>

                        </select>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Repeat Until

                        </label>

                        <input
                            type="date"
                            className="form-control"
                            name="repeatUntil"
                            value={formData.repeatUntil}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="d-flex">

                        <button
                            type="submit"
                            className="btn btn-primary me-2"
                        >

                            {appointment ? "Update" : "Save"}

                        </button>

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={onCancel}
                        >

                            Cancel

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default AppointmentForm;