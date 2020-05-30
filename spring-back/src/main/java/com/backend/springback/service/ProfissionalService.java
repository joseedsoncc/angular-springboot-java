package com.backend.springback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.springback.entity.Profissional;
import com.backend.springback.repository.ProfissionalRepository;

@Service
public class ProfissionalService {

	@Autowired
	private ProfissionalRepository repository;

	/* Cadastrar profissional */
	public Profissional saveProfissional(Profissional profissional) {
		return repository.save(profissional);
	}
	
	/* Atualizar profissional */
	public Profissional updateProfissional(Profissional profissional) {
		Profissional profAtual = getProfissionalById(profissional.getIdProfissional());

		profAtual.setNome(profissional.getNome());
		profAtual.setLogradouro(profissional.getLogradouro());
		profAtual.setNumero(profissional.getNumero());
		profAtual.setBairro(profissional.getBairro());
		profAtual.setCep(profissional.getCep());
		profAtual.setCidade(profissional.getCidade());
		profAtual.setUf(profissional.getUf());
		profAtual.setPais(profissional.getPais());
		profAtual.setComplemento(profissional.getComplemento());
		
		return repository.save(profAtual);
	}
	
	/* Remover profissional */
	public String deleteProfissional(Integer id) {
		repository.deleteById(id);
		return "Profissional removido com sucesso!";
	}
	
	/* Recuperar profissional pelo id */
	public Profissional getProfissionalById(Integer id) {
		return repository.findById(id).orElse(null);
	}
	
	/* Recuperar profissional pelo nome */
	public Profissional getProfissionalByName(String nome) {
		return repository.findByNome(nome);
	}

	/* Listar profissionais */
	public List<Profissional> getProfissionais() {
		return repository.findAll();
	}
	
	/* Vincular profissional ao estabelecimento */
	public Profissional vinculaProfissional(Profissional profissional) {
		Profissional profAtual = getProfissionalById(profissional.getIdProfissional());
		profAtual.setIdEstabProfissional(profissional.getIdEstabProfissional());
		return repository.save(profAtual);
	} 
	
	/* Desvincular estabelecimento do profissional */
	public Profissional desvinculaProfissional(Integer idProfissional) {
		Profissional profAtual = getProfissionalById(idProfissional);
		profAtual.setIdEstabProfissional(null);
		return repository.save(profAtual);
	}

}
