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

import com.backend.springback.entity.Profissional;
import com.backend.springback.service.ProfissionalService;

@RestController
public class ProfissionalController {

	@Autowired
	private ProfissionalService service;
	
	@PostMapping("/insereProfissional")
	public Profissional saveProfissional(@RequestBody Profissional profissional) {
		return service.saveProfissional(profissional);
	}

	@PutMapping("/atualizaProfissional")
	public Profissional updateProfissional(@RequestBody Profissional profissional) {
		return service.updateProfissional(profissional);
	}

	@DeleteMapping("/deletaProfissional/{id}")
	public String deleteProfissional(@PathVariable Integer id) {
		return service.deleteProfissional(id);
	}

	@GetMapping("/profissionalPorId/{id}")
	public Profissional getProfissionalById(@PathVariable Integer id) {
		return service.getProfissionalById(id);
	}

	@GetMapping("/profissionalPorNome/{nome}")
	public Profissional getProfissionalByName(@PathVariable String nome) {
		return service.getProfissionalByName(nome);
	}

	@GetMapping("/profissionais")
	public List<Profissional> getProfissionais() {
		return service.getProfissionais();
	}
	
	@PutMapping("/vinculaProfissional")
	public Profissional vinculaProfissional(@RequestBody Profissional profissional) {
		return service.vinculaProfissional(profissional);
	} 
	
	@PutMapping("/desvinculaProfissional/{idProfissional}")
	public Profissional desvinculaProfissional(@PathVariable Integer idProfissional) {
		return service.desvinculaProfissional(idProfissional);
	}
	
	
	
}
