package com.zealthy.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "dosages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Dosage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String value;
}