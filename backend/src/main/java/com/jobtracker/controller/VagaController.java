package com.jobtracker.controller;

import com.jobtracker.model.StatusVaga;
import com.jobtracker.model.Vaga;
import com.jobtracker.service.VagaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/vagas")
public class VagaController {

    private final VagaService vagaService;

    @Autowired
    public VagaController(VagaService vagaService) {
        this.vagaService = vagaService;
    }

    @GetMapping
    public ResponseEntity<List<Vaga>> listarTodas(
            @RequestParam(required = false) StatusVaga status,
            @RequestParam(required = false) String empresa) {

        if (status != null) {
            return ResponseEntity.ok(vagaService.listarPorStatus(status));
        }
        if (empresa != null && !empresa.isBlank()) {
            return ResponseEntity.ok(vagaService.buscarPorEmpresa(empresa));
        }
        return ResponseEntity.ok(vagaService.listarTodas());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vaga> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(vagaService.buscarPorId(id));
    }

    @GetMapping("/estatisticas")
    public ResponseEntity<Map<StatusVaga, Long>> estatisticas() {
        return ResponseEntity.ok(vagaService.estatisticasPorStatus());
    }

    @PostMapping
    public ResponseEntity<Vaga> criar(@Valid @RequestBody Vaga vaga) {
        Vaga criada = vagaService.criar(vaga);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vaga> atualizar(@PathVariable Long id, @Valid @RequestBody Vaga vaga) {
        return ResponseEntity.ok(vagaService.atualizar(id, vaga));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        vagaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}
