import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertComponent } from './alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private modalService: BsModalService) { }

  modalRef?: BsModalRef;

  private showAlert(message: string, type: string){

    this.modalRef = this.modalService.show(AlertComponent);
    this.modalRef.content.type = type;
    this.modalRef.content.message = message;
    
  }

  showAlertDanger(message: string){

    this.showAlert(message, "danger");

  }

  showAlertSuccess(message: string){

    this.showAlert(message, "success");

  }
}
