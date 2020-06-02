import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProfissionalComponent } from './component/profissional/profissional.component';
import { EstabelecimentoComponent } from './component/estabelecimento/estabelecimento.component';
import { ProfissionalService } from './service/profissional.service';
import { EstabelecimentoService } from './service/estabelecimento.service';
import { MensagemService } from './service/mensagem.service';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfissionaisModule } from './modules/profissionais/profissionais.module';
import { EstabelecimentosModule } from './modules/estabelecimentos/estabelecimentos.module';

const primengModules = [
  InputTextModule,
  ButtonModule,
  TableModule,
  DialogModule,
  PanelModule,
  MessagesModule,
  MessageModule,
  InputMaskModule,
  KeyFilterModule,
  InputTextareaModule,
  ConfirmDialogModule,
  ScrollPanelModule,
  DropdownModule
];

@NgModule({
  declarations: [
    AppComponent,
    ProfissionalComponent,
    EstabelecimentoComponent
  ],
  imports: [
    ProfissionaisModule,
    EstabelecimentosModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    primengModules
  ],
  providers: [
    ProfissionalService,
    EstabelecimentoService,
    MensagemService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
