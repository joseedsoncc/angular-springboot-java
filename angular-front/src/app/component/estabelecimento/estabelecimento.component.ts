import { Component, OnInit } from '@angular/core';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { MensagemService } from 'src/app/service/mensagem.service';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';
import { ProfissionalService } from 'src/app/service/profissional.service';

@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.css']
})
export class EstabelecimentoComponent implements OnInit {

  estabelecimentos: Array<any>;
  listGridEstabs: any[] = [];
  estabNovo: Boolean = false;
  exibeFormDialogEstab: Boolean = false;
  estabelecimento: Estabelecimento;
  selectendEstab: Estabelecimento;
  formEstabelecimento: FormGroup;
  formDialogEstab: FormGroup;

  colsGridEstabs = [
    { field: 'idEstabelecimento', header: 'Código' },
    { field: 'nome', header: 'Nome' },
    { field: 'logradouro', header: 'Endereço' },
    { field: 'numero', header: 'Número' },
    { field: 'bairro', header: 'Bairro' },
    { field: 'cidade', header: 'Cidade' },
    { field: 'uf', header: 'UF' },
  ];

  constructor(private estabelecimentoService: EstabelecimentoService,
              private profissionalService: ProfissionalService,
              private mensagemService: MensagemService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listar();
    this.initFormEstabelecimento();
    this.initFormDialogEstab();
  }

  get formEstabelecimentoCtrls() {
    return this.formDialogEstab.controls;
  }

  initFormEstabelecimento() {
    this.formEstabelecimento = this.formBuilder.group({ });
  }

  initFormDialogEstab(objProf: Estabelecimento = null) {
    if (objProf) {
      this.estabelecimento = { ...objProf };
    } else {
      this.estabelecimento = new Estabelecimento();
    }

    this.formDialogEstab = this.formBuilder.group({
      idEstabelecimento: new FormControl({value: this.estabelecimento.idEstabelecimento, disabled: true}),
      nome: new FormControl({value: this.estabelecimento.nome}),
      logradouro: new FormControl({value: (this.estabelecimento.logradouro)}),
      numero: new FormControl({value: (this.estabelecimento.numero)}),
      cep: new FormControl({value: (this.estabelecimento.cep)}),
      bairro: new FormControl({value: (this.estabelecimento.bairro)}),    
      cidade: new FormControl({value: (this.estabelecimento.cidade)}),
      uf: new FormControl({value: (this.estabelecimento.uf)}),
      pais: new FormControl({value: (this.estabelecimento.pais)}),
      complemento: new FormControl({value: (this.estabelecimento.complemento)})
    });
  }

  listar() {
    this.estabelecimentoService.listarEstabelecimentos().subscribe(
      dados => this.listGridEstabs = dados
    );
  }

  novoEstabelecimento() {
    this.estabNovo = true;
    this.initFormDialogEstab();
    this.exibeFormDialogEstab = true;
  }

  editarEstab(editProf: Estabelecimento) {
    this.estabNovo = false;
    this.initFormDialogEstab(editProf);
    this.montaFormCtrls(this.estabelecimento, this.formEstabelecimentoCtrls);
    this.exibeFormDialogEstab = true;
  }

  montaFormCtrls(estab: Estabelecimento, formEstabCtrls: { [key: string]: AbstractControl } ) {
    if (estab && formEstabCtrls) {
      if(formEstabCtrls.idEstabelecimento) {
        formEstabCtrls.idEstabelecimento.setValue(estab.idEstabelecimento);
      }
      if(formEstabCtrls.nome) {
        formEstabCtrls.nome.setValue(estab.nome);
      }
      if(formEstabCtrls.logradouro) {
        formEstabCtrls.logradouro.setValue(estab.logradouro);
      }
      if(formEstabCtrls.numero) {
        formEstabCtrls.numero.setValue(estab.numero);
      }
      if(formEstabCtrls.cep) {
        formEstabCtrls.cep.setValue(estab.cep);
      }
      if(formEstabCtrls.bairro) {
        formEstabCtrls.bairro.setValue(estab.bairro);
      }
      if(formEstabCtrls.cidade) {
        formEstabCtrls.cidade.setValue(estab.cidade);
      }
      if(formEstabCtrls.uf) {
        formEstabCtrls.uf.setValue(estab.uf);
      }
      if(formEstabCtrls.pais) {
        formEstabCtrls.pais.setValue(estab.pais);
      }
      if(formEstabCtrls.complemento) {
        formEstabCtrls.complemento.setValue(estab.complemento);
      }
    }
  }

  closeDialogEstab() {
    this.estabNovo = null;
    this.exibeFormDialogEstab = false;
    this.formDialogEstab.reset();
    this.listar();
  }

  salvarEstab() {
    const objEstab = this.montaObjSalvar();
    if (this.estabNovo) {
      this.incluirEstab(objEstab);
    } else {
      this.alterarEstab(objEstab);
    }
  }

  incluirEstab(estab: Estabelecimento) {
    this.estabelecimentoService.incluirEstabelecimento(estab).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogEstab();
          this.mensagemService.addMessageSuccess('Estabelecimento salvo com sucesso.');
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  alterarEstab(estab: Estabelecimento) {
    this.estabelecimentoService.alterarEstabelecimento(estab).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogEstab();
          this.mensagemService.addMessageSuccess('Estabelecimento salvo com sucesso.');
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  verificaVinculoEstabelecimento(estab: Estabelecimento) {
    let idProf = null;
    this.profissionalService.listarProfissionais().subscribe(profs => {
      if (profs) {
        idProf = profs.find(p => p.idEstabProfissional === estab.idEstabelecimento).idProfissional;
      }
    });

    if(idProf) {
      this.mensagemService.addMessageError('O estabelecimento não pode ser excluído, pois possui vínculo empregatício!');
    } else {
      this.excluirEstab(estab);
    }
  }

  excluirEstab(estab: Estabelecimento) {
    this.estabelecimentoService.excluirEstabelecimento(estab).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogEstab();
          this.mensagemService.addMessageSuccess(res);
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  private montaObjSalvar() {
    this.estabelecimento.idEstabelecimento = this.formEstabelecimentoCtrls.idEstabelecimento.value;
    this.estabelecimento.nome = this.formEstabelecimentoCtrls.nome.value;
    this.estabelecimento.logradouro = this.formEstabelecimentoCtrls.logradouro.value;
    this.estabelecimento.numero = this.formEstabelecimentoCtrls.numero.value;
    this.estabelecimento.cep = this.formEstabelecimentoCtrls.cep.value;
    this.estabelecimento.bairro = this.formEstabelecimentoCtrls.bairro.value;
    this.estabelecimento.cidade = this.formEstabelecimentoCtrls.cidade.value;
    this.estabelecimento.uf = this.formEstabelecimentoCtrls.uf.value;
    this.estabelecimento.pais = this.formEstabelecimentoCtrls.pais.value;
    this.estabelecimento.complemento = this.formEstabelecimentoCtrls.complemento.value;
    
    return this.estabelecimento;
  }

  hasErrorInField(campo: string): boolean {
    if (this.formEstabelecimentoCtrls[campo] !== undefined) {
      return !this.formEstabelecimentoCtrls[campo].valid && this.formEstabelecimentoCtrls[campo].dirty
              && !this.formEstabelecimentoCtrls[campo].disabled;
    } else {
      throw new Error(`O campo ${campo} não está presente no formulário.`);
    }
  }

  getErrorFromField(campo: string): string {
    let control: AbstractControl;
    if (this.formEstabelecimentoCtrls[campo] !== undefined) {
      control = this.formEstabelecimentoCtrls[campo];
    } else {
      throw new Error(`O campo ${campo} não está presente no formulário`);
    }
    if (control.errors != null) {
      if (control.errors.required != null) {
        return 'Campo obrigatório.';
      } else if (control.errors.maxlength != null) {
        return `Tamanho máximo (${control.errors.maxlength.requiredLength}) excedido.`;
      } else if (control.errors.max != null) {
        return `O valor máximo para o campo é ${control.errors.max.max}`;
      } else if (control.errors.min != null) {
        return `O valor mínimo para o campo é ${control.errors.min.min}`;
      } else if (control.errors.pattern != null) {
        return `Texto inválido para o campo`;
      }
      return 'Erro não especificado.';
    } else {
      return 'Erro não encontrado';
    }
  }

}
