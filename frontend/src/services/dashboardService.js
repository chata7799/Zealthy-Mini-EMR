import api from "../api/axios";

export const getDashboard = async (patientId) => {

    const response = await api.get(`/dashboard/${patientId}`);

    return response.data;

};