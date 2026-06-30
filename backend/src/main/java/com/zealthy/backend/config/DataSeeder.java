package com.zealthy.backend.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zealthy.backend.entity.*;
import com.zealthy.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.OffsetDateTime;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final PatientRepository patientRepository;
    private final AppointmentRepository appointmentRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final MedicationRepository medicationRepository;
    private final DosageRepository dosageRepository;

    @Override
    public void run(String... args) throws Exception {

        if (patientRepository.count() > 0) {
            System.out.println("Database already seeded.");
            return;
        }

        ObjectMapper mapper = new ObjectMapper();

        SeedData data = mapper.readValue(
                new ClassPathResource("data.json").getInputStream(),
                SeedData.class
        );

        seedMedications(data);

        seedDosages(data);

        seedPatients(data);

        System.out.println("Database seeded successfully.");
    }

    private void seedMedications(SeedData data) {

        for (String medicationName : data.getMedications()) {

            Medication medication = new Medication();
            medication.setName(medicationName);

            medicationRepository.save(medication);
        }
    }

    private void seedDosages(SeedData data) {

        for (String dosageValue : data.getDosages()) {

            Dosage dosage = new Dosage();
            dosage.setValue(dosageValue);

            dosageRepository.save(dosage);
        }
    }

    private void seedPatients(SeedData data) {

        for (SeedUser user : data.getUsers()) {

            Patient patient = new Patient();

            patient.setName(user.getName());
            patient.setEmail(user.getEmail());
            patient.setPassword(user.getPassword());

            Patient savedPatient = patientRepository.save(patient);

            seedAppointments(user, savedPatient);

            seedPrescriptions(user, savedPatient);
        }
    }

    private void seedAppointments(SeedUser user, Patient patient) {

        for (SeedAppointment appointmentData : user.getAppointments()) {

            Appointment appointment = new Appointment();

            appointment.setProvider(appointmentData.getProvider());
            appointment.setDatetime(
                    LocalDateTime.parse(appointmentData.getDatetime()));
            appointment.setRepeat(appointmentData.getRepeat());

            // JSON doesn't contain this field
            appointment.setRepeatUntil(null);

            appointment.setPatient(patient);

            appointmentRepository.save(appointment);
        }
    }

    private void seedPrescriptions(SeedUser user, Patient patient) {

        for (SeedPrescription prescriptionData : user.getPrescriptions()) {

            Prescription prescription = new Prescription();

            prescription.setMedication(prescriptionData.getMedication());
            prescription.setDosage(prescriptionData.getDosage());
            prescription.setQuantity(prescriptionData.getQuantity());

            prescription.setRefillOn(
                    LocalDate.parse(prescriptionData.getRefill_on()));

            prescription.setRefillSchedule(
                    prescriptionData.getRefill_schedule());

            prescription.setPatient(patient);

            prescriptionRepository.save(prescription);
        }
    }
}