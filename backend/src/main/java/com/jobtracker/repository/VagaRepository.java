package com.jobtracker.repository;

import com.jobtracker.model.StatusVaga;
import com.jobtracker.model.Vaga;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VagaRepository extends JpaRepository<Vaga, Long> {

    List<Vaga> findByStatus(StatusVaga status);

    List<Vaga> findByEmpresaContainingIgnoreCase(String empresa);

    List<Vaga> findAllByOrderByDataAplicacaoDesc();
}
