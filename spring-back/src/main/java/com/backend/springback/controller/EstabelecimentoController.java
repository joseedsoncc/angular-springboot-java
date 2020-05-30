package com.backend.springback.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.springback.entity.Estabelecimento;
import com.backend.springback.service.EstabelecimentoService;

@RestController
public class EstabelecimentoController {

	@Autowired
	private EstabelecimentoService service;
	
	@PostMapping("/insereEstabelecimento")
	public Estabelecimento saveEstabelecimento(@RequestBody Estabelecimento estabelecimento) {
		return service.saveEstabelecimento(estabelecimento);
	}

	@PutMapping("/atualizaEstabelecimento")
	public Estabelecimento updateEstabelecimento(@RequestBody Estabelecimento estabelecimento) {
		return service.updateEstabelecimento(estabelecimento);
	}

	@DeleteMapping("/deletaEstabelecimento/{id}")
	public String deleteEstabelecimento(@PathVariable Integer id) {
		return service.deleteEstabelecimento(id);
	}

	@GetMapping("/estabelecimentoPorId/{id}")
	public Estabelecimento getEstabelecimentoById(@PathVariable Integer id) {
		return service.getEstabelecimentoById(id);
	}

	@GetMapping("/estabelecimentoPorNome/{nome}")
	public Estabelecimento getEstabelecimentoByName(@PathVariable String nome) {
		return service.getEstabelecimentoByName(nome);
	}

	@GetMapping("/estabelecimentos")
	public List<Estabelecimento> getEstabelecimentos() {
		return service.getEstabelecimentos();
	}

}
