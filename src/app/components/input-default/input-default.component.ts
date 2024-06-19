import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-default',
  templateUrl: './input-default.component.html',
  styleUrls: ['./input-default.component.css']
})
export class InputDefaultComponent {
  
  @Input() formGroup: string | any;
  @Input() formName: string = '';
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type = 'text';

  
}
