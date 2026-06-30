import api from "../api/axios";

export const getAppointments = async (patientId) => {

    const response = await api.get(`/patients/${patientId}/appointments`);

    return response.data;

};
export const createAppointment = async (patientId, appointment) => {

    const response = await api.post(
        `/patients/${patientId}/appointments`,
        appointment
    );

    return response.data;

};
export const deleteAppointment = async (appointmentId) => {

    await api.delete(`/appointments/${appointmentId}`);

};

export const updateAppointment = async (appointmentId, appointment) => {

    const response = await api.put(
        `/appointments/${appointmentId}`,
        appointment
    );

    return response.data;

};