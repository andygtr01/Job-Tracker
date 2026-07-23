package com.jobtracker.service;

import com.jobtracker.exception.ResourceNotFoundException;
import com.jobtracker.model.StatusVaga;
import com.jobtracker.model.Vaga;
import com.jobtracker.repository.VagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class VagaService {

    private final VagaRepository vagaRepository;

    @Autowired
    public VagaService(VagaRepository vagaRepository) {
        this.vagaRepository = vagaRepository;
    }

    public List<Vaga> listarTodas() {
        return vagaRepository.findAllByOrderByDataAplicacaoDesc();
    }

    public Vaga buscarPorId(Long id) {
        return vagaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vaga não encontrada com id " + id));
    }

    public List<Vaga> listarPorStatus(StatusVaga status) {
        return vagaRepository.findByStatus(status);
    }

    public List<Vaga> buscarPorEmpresa(String empresa) {
        return vagaRepository.findByEmpresaContainingIgnoreCase(empresa);
    }

    public Vaga criar(Vaga vaga) {
        return vagaRepository.save(vaga);
    }

    public Vaga atualizar(Long id, Vaga dadosAtualizados) {
        Vaga existente = buscarPorId(id);

        existente.setEmpresa(dadosAtualizados.getEmpresa());
        existente.setCargo(dadosAtualizados.getCargo());
        existente.setLink(dadosAtualizados.getLink());
        existente.setLocalizacao(dadosAtualizados.getLocalizacao());
        existente.setModalidade(dadosAtualizados.getModalidade());
        existente.setSalarioPretendido(dadosAtualizados.getSalarioPretendido());
        existente.setDataAplicacao(dadosAtualizados.getDataAplicacao());
        existente.setStatus(dadosAtualizados.getStatus());
        existente.setObservacoes(dadosAtualizados.getObservacoes());

        return vagaRepository.save(existente);
    }

    public void deletar(Long id) {
        Vaga existente = buscarPorId(id);
        vagaRepository.delete(existente);
    }

    public Map<StatusVaga, Long> estatisticasPorStatus() {
        return vagaRepository.findAll().stream()
                .collect(Collectors.groupingBy(Vaga::getStatus, Collectors.counting()));
    }
}
