package com.zealthy.backend.repository;

import com.zealthy.backend.entity.Dosage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DosageRepository extends JpaRepository<Dosage, Long> {

}