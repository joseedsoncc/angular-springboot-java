import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private messageService: MessageService) { }

  addMessageSuccess(titulo: string, mensagem?: string) {
    this.messageService.add({severity: 'success', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessageInfo(titulo: string, mensagem?: string) {
    this.messageService.add({severity: 'info', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessageWarn(titulo: string, mensagem?: string) {
    this.messageService.add({severity: 'warn', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessageError(titulo: string, mensagem?: string) {
    this.messageService.add({severity: 'error', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessagesSuccess(msgs: any[], titulo: string, mensagem: string) {
    msgs.push({severity: 'success', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessagesInfo(msgs: any[], titulo: string, mensagem: string) {
    msgs.push({severity: 'info', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessagesWarn(msgs: any[], titulo: string, mensagem: string) {
    msgs.push({severity: 'warn', summary: titulo, detail: mensagem, life: 6000});
  }

  addMessagesError(msgs: any[], titulo: string, mensagem: string) {
    msgs.push({severity: 'error', summary: titulo, detail: mensagem, life: 6000});
  }

  clear() {
    this.messageService.clear();
  }
}
