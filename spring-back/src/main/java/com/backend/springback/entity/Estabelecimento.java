package com.backend.springback.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="TB_ESTABELECIMENTO")
public class Estabelecimento {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="ID_ESTABELECIMENTO")
	private Integer idEstabelecimento;
	
	@Column(name="NOME", nullable=false, length=70)
	private String nome;
	
	@Column(name="LOGRADOURO", nullable=false, length=70)
	private String logradouro;
	
	@Column(name="NUMERO", nullable=false, length=10)
	private String numero;

	@Column(name="BAIRRO", nullable=false, length=40)
	private String bairro;
	
	@Column(name="CEP", nullable=false, length=10)
	private Long cep;
	
	@Column(name="CIDADE", nullable=false, length=40)
	private String cidade;
	
	@Column(name="UF", nullable=false, length=2)
	private String uf;
	
	@Column(name="PAIS", nullable=false, length=40)
	private String pais;
	
	@Column(name="COMPLEMENTO", length=150)
	private String complemento;

}
