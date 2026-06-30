import api from "../api/axios";

export const getPrescriptions = async (patientId) => {

    const response = await api.get(
        `/patients/${patientId}/prescriptions`
    );

    return response.data;

};

export const createPrescription = async (
    patientId,
    prescription
) => {

    const response = await api.post(
        `/patients/${patientId}/prescriptions`,
        prescription
    );

    return response.data;

};

export const updatePrescription = async (
    prescriptionId,
    prescription
) => {

    const response = await api.put(
        `/prescriptions/${prescriptionId}`,
        prescription
    );

    return response.data;

};

export const deletePrescription = async (
    prescriptionId
) => {

    await api.delete(
        `/prescriptions/${prescriptionId}`
    );

};