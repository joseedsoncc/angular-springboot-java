import { Component, OnInit } from '@angular/core';
import { ProfissionalService } from 'src/app/service/profissional.service';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { MensagemService } from 'src/app/service/mensagem.service';
import { Profissional } from 'src/app/model/profissional.model';
import { SelectItem } from 'primeng/api/selectitem';
import { EstabelecimentoService } from 'src/app/service/estabelecimento.service';
import { Estabelecimento } from 'src/app/model/estabelecimento.model';

@Component({
  selector: 'app-profissional',
  templateUrl: './profissional.component.html',
  styleUrls: ['./profissional.component.css']
})
export class ProfissionalComponent implements OnInit {

  profissionais: Array<any>;
  listGridProfs: any[] = [];
  profNovo: Boolean = false;
  exibeFormDialogProf: Boolean = false;
  formDialogProf: FormGroup;
  profissional: Profissional;
  selectendProf: Profissional;
  formProfissional: FormGroup;
  
  exibeFormDialogVinculoProf: Boolean = false;
  formDialogVinculoProf: FormGroup;
  nomeEstabelecimento: string;
  arrEstabelecimento: SelectItem[];
  selecioneOption = { label: 'SELECIONE UMA OPÇÃO', value: undefined };

  colsGridProfs = [
    { field: 'idProfissional', header: 'Código' },
    { field: 'nome', header: 'Nome' },
    { field: 'logradouro', header: 'Endereço' },
    { field: 'numero', header: 'Número' },
    { field: 'bairro', header: 'Bairro' },
    { field: 'cidade', header: 'Cidade' },
    { field: 'uf', header: 'UF' },
    { field: 'idEstabProfissional', header: 'Estabelecimento' }
  ];

  constructor(private profissionalService: ProfissionalService,
              private estabelecimentoService: EstabelecimentoService,
              private mensagemService: MensagemService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.listar();
    this.initFormProfissional();
    this.initFormDialogProf();
    this.initFormDialogVinculoProf();
    //
  }

  get formProfissionalCtrls() {
    return this.formDialogProf.controls;
  }

  get formProfVinculoCtrls() {
    return this.formDialogVinculoProf.controls;
  }

  initFormProfissional() {
    this.formProfissional = this.formBuilder.group({ });
  }

  initFormDialogProf(objProf: Profissional = null) {
    if (objProf) {
      this.profissional = { ...objProf };
      
    } else {
      this.profissional = new Profissional();
    }

    this.formDialogProf = this.formBuilder.group({
      idProfissional: new FormControl({value: this.profissional.idProfissional, disabled: true}),
      nome: new FormControl({value: this.profissional.nome}),
      logradouro: new FormControl({value: (this.profissional.logradouro)}),
      numero: new FormControl({value: (this.profissional.numero)}),
      cep: new FormControl({value: (this.profissional.cep)}),
      bairro: new FormControl({value: (this.profissional.bairro)}),    
      cidade: new FormControl({value: (this.profissional.cidade)}),
      uf: new FormControl({value: (this.profissional.uf)}),
      pais: new FormControl({value: (this.profissional.pais)}),
      complemento: new FormControl({value: (this.profissional.complemento)})
    });
  }

  initFormDialogVinculoProf(objProf: Profissional = null) {
    this.listarEstabelecimento();

    if (objProf) {
      this.profissional = { ...objProf };
    } else {
      this.profissional = new Profissional();
    }

    this.formDialogVinculoProf = this.formBuilder.group({
      idProfissional: new FormControl({value: this.profissional.idProfissional, disabled: true}),
      nome: new FormControl({value: this.profissional.nome, disabled: true}),
      idEstabProfissional: new FormControl({value: this.profissional.idEstabProfissional})
    });
  }

  listar() {
    this.profissionalService.listarProfissionais().subscribe(
      dados => this.listGridProfs = dados
    );
  }

  listarEstabelecimento() {
    this.arrEstabelecimento = [this.selecioneOption];
    this.estabelecimentoService.listarEstabelecimentos().subscribe((outEstabs: Estabelecimento[]) => {
      if (outEstabs && outEstabs.length > 0) {
        outEstabs.forEach(item => {
          this.arrEstabelecimento.push({
            label: item.nome.toUpperCase(),
            value: item.idEstabelecimento
          });
        });
      }
    });
    return this.arrEstabelecimento;
  }

  novoProfissional() {
    this.profNovo = true;
    this.initFormDialogProf();
    this.exibeFormDialogProf = true;
  }

  editarProf(editProf: Profissional) {
    this.profNovo = false;
    this.initFormDialogProf(editProf);
    this.montaFormCtrls(this.profissional, this.formProfissionalCtrls);
    this.exibeFormDialogProf = true;
  }

  montaFormCtrls(prof: Profissional, formProfCtrls: { [key: string]: AbstractControl } ) {
    if (prof && formProfCtrls) {
      if(formProfCtrls.idProfissional) {
        formProfCtrls.idProfissional.setValue(prof.idProfissional);
      }
      if(formProfCtrls.nome) {
        formProfCtrls.nome.setValue(prof.nome);
      }
      if(formProfCtrls.logradouro) {
        formProfCtrls.logradouro.setValue(prof.logradouro);
      }
      if(formProfCtrls.numero) {
        formProfCtrls.numero.setValue(prof.numero);
      }
      if(formProfCtrls.cep) {
        formProfCtrls.cep.setValue(prof.cep);
      }
      if(formProfCtrls.bairro) {
        formProfCtrls.bairro.setValue(prof.bairro);
      }
      if(formProfCtrls.cidade) {
        formProfCtrls.cidade.setValue(prof.cidade);
      }
      if(formProfCtrls.uf) {
        formProfCtrls.uf.setValue(prof.uf);
      }
      if(formProfCtrls.pais) {
        formProfCtrls.pais.setValue(prof.pais);
      }
      if(formProfCtrls.complemento) {
        formProfCtrls.complemento.setValue(prof.complemento);
      }
      if(formProfCtrls.idEstabProfissional) {
        formProfCtrls.idEstabProfissional.setValue(prof.idEstabProfissional);
      }
    }
  }

  closeDialogProf() {
    this.profNovo = null;
    this.exibeFormDialogProf = false;
    this.formDialogProf.reset();
    this.listar();
  }

  salvarProf() {
    const objProf = this.montaObjSalvar();
    if (this.profNovo) {
      this.incluirProf(objProf);
    } else {
      this.alterarProf(objProf);
    }
  }

  incluirProf(prof: Profissional) {
    this.profissionalService.incluirProfissional(prof).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogProf();
          this.mensagemService.addMessageSuccess('Profissional salvo com sucesso.');
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  alterarProf(prof: Profissional) {
    this.profissionalService.alterarProfissional(prof).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogProf();
          this.mensagemService.addMessageSuccess('Profissional salvo com sucesso.');
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  excluirProf(prof: Profissional) {
    this.profissionalService.excluirProfissional(prof).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogProf();
          this.mensagemService.addMessageSuccess(res);
          //this.formDialogProf.reset();
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  vincularProf(profVinculo: Profissional) {
    this.initFormDialogVinculoProf(profVinculo);
    this.montaFormVinculoCtrls(this.profissional, this.formProfVinculoCtrls);
    this.exibeFormDialogVinculoProf = true;
  }

  salvarVinculoProf() {
    const objProfVinculo = this.montaObjVinculoSalvar();

    this.profissionalService.vinculaProfissional(objProfVinculo).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogVinculoProf();
          this.mensagemService.addMessageSuccess('Profissional vinculado com sucesso.');
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  salvarDesvinculoProf() {
    this.profissional.idProfissional = this.formProfVinculoCtrls.idProfissional.value;

    this.profissionalService.desvinculaProfissional(this.profissional).subscribe({
      next: (res) => {
        if (res) {
          this.closeDialogVinculoProf();
          this.mensagemService.addMessageSuccess('Profissional desvinculado com sucesso.');
        }
      }, error: err => {
        if (err != null && err.error != null && err.error.mensagem != null) {
          this.mensagemService.addMessageError(err.error.mensagem);
        }
      }
    });
  }

  closeDialogVinculoProf() {
    this.exibeFormDialogVinculoProf = false;
    this.formDialogVinculoProf.reset();
    this.listar();
  }

  getLabelEstabelecimento(ev) {
    this.nomeEstabelecimento = this.arrEstabelecimento.find(i => i.value === ev.value).label;
  }

  montaFormVinculoCtrls(profVinculo: Profissional, formProfVinculoCtrls: { [key: string]: AbstractControl } ) {
    if (profVinculo && formProfVinculoCtrls) {
      if(formProfVinculoCtrls.idProfissional) {
        formProfVinculoCtrls.idProfissional.setValue(profVinculo.idProfissional);
      }
      if(formProfVinculoCtrls.nome) {
        formProfVinculoCtrls.nome.setValue(profVinculo.nome);
      }
      if(formProfVinculoCtrls.idEstabProfissional) {
        formProfVinculoCtrls.idEstabProfissional.setValue(profVinculo.idEstabProfissional);
      }
    }
  }

  private montaObjSalvar() {
    this.profissional.idProfissional = this.formProfissionalCtrls.idProfissional.value;
    this.profissional.nome = this.formProfissionalCtrls.nome.value;
    this.profissional.logradouro = this.formProfissionalCtrls.logradouro.value;
    this.profissional.numero = this.formProfissionalCtrls.numero.value;
    this.profissional.cep = this.formProfissionalCtrls.cep.value;
    this.profissional.bairro = this.formProfissionalCtrls.bairro.value;
    this.profissional.cidade = this.formProfissionalCtrls.cidade.value;
    this.profissional.uf = this.formProfissionalCtrls.uf.value;
    this.profissional.pais = this.formProfissionalCtrls.pais.value;
    this.profissional.complemento = this.formProfissionalCtrls.complemento.value;
    return this.profissional;
  }

  private montaObjVinculoSalvar() {
    this.profissional.idProfissional = this.formProfVinculoCtrls.idProfissional.value;
    this.profissional.idEstabProfissional = this.formProfVinculoCtrls.idEstabProfissional.value;  
    this.profissional.nomeEstabProfissional = this.arrEstabelecimento.find(i => i.value === this.profissional.idEstabProfissional).label;
    return this.profissional;
  }

  hasErrorInField(campo: string): boolean {
    if (this.formProfissionalCtrls[campo] !== undefined) {//formProfVinculoCtrls
      return !this.formProfissionalCtrls[campo].valid && this.formProfissionalCtrls[campo].dirty
              && !this.formProfissionalCtrls[campo].disabled;
    } else {
      throw new Error(`O campo ${campo} não está presente no formulário.`);
    }
  }

  getErrorFromField(campo: string): string {
    let control: AbstractControl;
    if (this.formProfissionalCtrls[campo] !== undefined) {
      control = this.formProfissionalCtrls[campo];
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

  hasErrorInFieldVinculo(campo: string): boolean {
    if (this.formProfVinculoCtrls[campo] !== undefined) {
      return !this.formProfVinculoCtrls[campo].valid && this.formProfVinculoCtrls[campo].dirty
              && !this.formProfVinculoCtrls[campo].disabled;
    } else {
      throw new Error(`O campo ${campo} não está presente no formulário.`);
    }
  }

  getErrorFromFieldVinculo(campo: string): string {
    let control: AbstractControl;
    if (this.formProfVinculoCtrls[campo] !== undefined) {
      control = this.formProfVinculoCtrls[campo];
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
