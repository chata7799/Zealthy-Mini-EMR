import { useEffect, useState } from "react";
import { FaCalendarAlt, FaCapsules, FaUserMd } from "react-icons/fa";
import { Link } from "react-router-dom";
import PatientLayout from "../layouts/PatientLayout";
import StatCard from "../components/StatCard";
import SectionCard from "../components/SectionCard";

import { getDashboard } from "../services/dashboardService";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const patient = JSON.parse(localStorage.getItem("patient"));

            if (!patient) return;

            const data = await getDashboard(patient.id);

            setDashboard(data);

        } catch (error) {

            console.log(error);

        }

    };

    if (!dashboard) {

        return <h3 className="text-center mt-5">Loading...</h3>;

    }

    return (

        <PatientLayout patient={dashboard}>

            <div className="mb-4">

                <h2 className="fw-bold">

                    Welcome back,

                    {" "}

                    {dashboard.patientName}

                    👋

                </h2>

                <p className="text-muted">

                    Here's your health summary for today.

                </p>

            </div>

            <div className="row g-4 mb-4">

                <StatCard
                    title="Appointments"
                    value={dashboard.upcomingAppointments.length}
                    icon={<FaCalendarAlt />}
                    color="#2563EB"
                />

                <StatCard
                    title="Upcoming Refills"
                    value={dashboard.upcomingRefills.length}
                    icon={<FaCapsules />}
                    color="#10B981"
                />

                <StatCard
                    title="Doctors"
                    value={
                        new Set(
                            dashboard.upcomingAppointments.map(a => a.provider)
                        ).size
                    }
                    icon={<FaUserMd />}
                    color="#F59E0B"
                />

            </div>

            <div className="row g-4">

                <div className="col-lg-6">

                    <SectionCard title="Upcoming Appointments">

                        {

                            dashboard.upcomingAppointments.length === 0 ?

                                <p className="text-muted">

                                    No appointments scheduled.

                                </p>

                                :

                                dashboard.upcomingAppointments.map(app => (

                                    <div
                                        key={app.id}
                                        className="border-bottom pb-3 mb-3"
                                    >

                                        <h6 className="fw-bold">

                                            {app.provider}

                                        </h6>

                                        <small className="text-muted">

                                            {

                                                new Date(
                                                    app.datetime
                                                ).toLocaleString()

                                            }

                                        </small>

                                        <br />

                                        <span
                                            className="badge bg-primary mt-2"
                                        >

                                            {app.repeat}

                                        </span>

                                    </div>

                                ))

                        }
                        <div className="d-flex justify-content-end mt-3">

    <Link
        to="/appointments"
        className="btn btn-outline-primary btn-sm"
    >
        View All Appointments
    </Link>

</div>

                    </SectionCard>

                </div>

                <div className="col-lg-6">

                    <SectionCard title="Upcoming Medication Refills">

                        {

                            dashboard.upcomingRefills.length === 0 ?

                                <p className="text-muted">

                                    No medication refills.

                                </p>

                                :

                                dashboard.upcomingRefills.map(med => (

                                    <div
                                        key={med.id}
                                        className="border-bottom pb-3 mb-3"
                                    >

                                        <h6 className="fw-bold">

                                            {med.medication}

                                        </h6>

                                        <small>

                                            {med.dosage}

                                        </small>

                                        <br />

                                        <small className="text-muted">

                                            Refill:

                                            {" "}

                                            {med.refillOn}

                                        </small>

                                    </div>

                                ))

                        }
     <div className="d-flex justify-content-end mt-3">

            <Link
                to="/prescriptions"
                className="btn btn-outline-success btn-sm"
            >
                View All Prescriptions
            </Link>

                </div>

                    </SectionCard>

                </div>

            </div>

        </PatientLayout>

    );

}

export default Dashboard;