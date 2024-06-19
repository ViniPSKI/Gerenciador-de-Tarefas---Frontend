import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() message: string = '';
  @Input() type: string = 'success';

  constructor(public bsModalRef: BsModalRef){
  }
  
  onClose(){
    this.bsModalRef.hide();
  }

}
