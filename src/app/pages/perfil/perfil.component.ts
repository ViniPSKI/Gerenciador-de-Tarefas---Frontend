import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { response } from 'express';
import { User } from 'src/app/interfaces/UserInterface';
import { UserServiceService } from 'src/app/services/user/user-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {

  user: User | any;

  formulario: FormGroup | any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private route: ActivatedRoute
  ){
  }

  ngOnInit(){

    this.user = this.route.snapshot.data['user'];

    this.formulario = this.formBuilder.group({
      email: [this.user.email, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  onSubmit(){
    if(this.matchsPassword(this.formulario.value)){
      this.user = {email: this.formulario.value.email, password: this.formulario.value.password}
      this.userService.editUser(this.user).subscribe();
      this.router.navigate(['menu']);
    }else{
      alert("Deu ruim chefe");
    }
  }

  matchsPassword(form: any){
    if(form.password == form.confirmPassword){
      return true;
    }
    return false;
  }

  deleteUser(){
    this.userService.deleteUser().subscribe(
      (success) => {
        this.router.navigate(['home']);
      }
    );  
  }

}
