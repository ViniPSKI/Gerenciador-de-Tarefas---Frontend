import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/interfaces/TaskInterface';
import { TaskServiceService } from 'src/app/services/task/task-service.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {

  task: Task | any;
  formulario: FormGroup | any;
  jwt: string = "";
  state: string = "Create";

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private taskService: TaskServiceService,
    private route: ActivatedRoute,
    private alert: AlertService
  ){
  }

  ngOnInit(){

    this.task = this.route.snapshot.data['task'];

    if(this.task.id != null){
      this.state = "Edit"
    }

    this.formulario = this.formBuilder.group({
      id:[this.task.id],
      title: [this.task.title, Validators.required],
      description: [this.task.description, Validators.required],
      responsibilityTo: [this.task.responsibilityTo, Validators.required]
    });
  }

  onSubmit(){

    if(this.task.id == null){

      this.taskService.createTask(this.formulario.value).subscribe(
        (response:Task|any) => {
          this.alert.showAlertSuccess("Task created!");
          this.router.navigate(['menu']);
        },
        (error:any) => {
          this.alert.showAlertDanger("Error - "+error.message)
        }
      );

    }else{
      
      this.taskService.editTask(this.formulario.value).subscribe(
        (response:Task|any) => {
          this.alert.showAlertSuccess("Task edited!");
          this.router.navigate(['menu']);
        },
        (error:any) => {
          this.alert.showAlertDanger("Error - "+error.message)
        }
      );

    }
  }

}
