package com.backend.springback.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.springback.entity.Estabelecimento;


public interface EstabelecimentoRepository extends JpaRepository<Estabelecimento, Integer> {

	Estabelecimento findByNome(String nome);
	
}
