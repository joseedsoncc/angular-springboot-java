package com.backend.springback.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.springback.entity.Estabelecimento;
import com.backend.springback.repository.EstabelecimentoRepository;

@Service
public class EstabelecimentoService {

	@Autowired
	private EstabelecimentoRepository repository;

	/* Cadastrar estabelecimento */
	public Estabelecimento saveEstabelecimento(Estabelecimento estabelecimento) {
		return repository.save(estabelecimento);
	}
	
	/* Atualizar estabelecimento */
	public Estabelecimento updateEstabelecimento(Estabelecimento estabelecimento) {
		Estabelecimento estabAtual = getEstabelecimentoById(estabelecimento.getIdEstabelecimento());

		estabAtual.setNome(estabelecimento.getNome());
		estabAtual.setLogradouro(estabelecimento.getLogradouro());
		estabAtual.setNumero(estabelecimento.getNumero());
		estabAtual.setBairro(estabelecimento.getBairro());
		estabAtual.setCep(estabelecimento.getCep());
		estabAtual.setCidade(estabelecimento.getCidade());
		estabAtual.setUf(estabelecimento.getUf());
		estabAtual.setPais(estabelecimento.getPais());
		estabAtual.setComplemento(estabelecimento.getComplemento());
		
		return repository.save(estabAtual);
	}
	
	/* Remover estabelecimento */
	public String deleteEstabelecimento(Integer id) {
		repository.deleteById(id);
		return "Estabelecimento removido com sucesso!";
	}
	
	/* Recuperar estabelecimento pelo id */
	public Estabelecimento getEstabelecimentoById(Integer id) {
		return repository.findById(id).orElse(null);
	}
	
	/* Recuperar estabelecimento pelo nome */
	public Estabelecimento getEstabelecimentoByName(String nome) {
		return repository.findByNome(nome);
	}

	/* Listar estabelecimentos */
	public List<Estabelecimento> getEstabelecimentos() {
		return repository.findAll();
	}

}
