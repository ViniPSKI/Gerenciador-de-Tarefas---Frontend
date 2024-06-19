import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroup } from 'reactstrap';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup | any;
  jwt: string = "";

  constructor(private formBuilder: FormBuilder,
    private authService: ApiServiceService,
    private router: Router,
    private alert: AlertService
  ){
  }

  ngOnInit(){
    this.formulario = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onSubmit(){

    console.log(this.formulario.value);

    this.authService.auth(this.formulario.value).subscribe(
      (response: { token: string }) => {
        const jwt = response.token;
        this.authService.setToken(jwt);
        this.router.navigate(['menu']);
      },
      (error: any) => {
        this.alert.showAlertDanger(error.error.message)
      }
    );
  }

}
