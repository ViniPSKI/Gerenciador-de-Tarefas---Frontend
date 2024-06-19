import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/UserInterface';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  formulario: FormGroup | any;
  jwt: string = "";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
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

    this.userService.createUser(this.formulario.value).subscribe(
      (response:User|any) => {
        this.alert.showAlertSuccess("User created!")
      },
      (error:any) => {
        this.alert.showAlertDanger("Error - " + error.message)
      }
    );

  }

}
