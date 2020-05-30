package com.backend.springback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springback.entity.Profissional;


public interface ProfissionalRepository extends JpaRepository<Profissional, Integer> {

	Profissional findByNome(String nome);
	
}
