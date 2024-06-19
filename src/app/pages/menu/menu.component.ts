import { Component } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Task } from 'src/app/interfaces/TaskInterface';
import { TaskServiceService } from 'src/app/services/task/task-service.service';
import { AlertService } from 'src/app/shared/alert.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  tasks$: Observable<Task[]> = new Observable<Task[]>();

  constructor(private taskService: TaskServiceService, private alert: AlertService){

  }

  ngOnInit(): void {

    this.tasks$ = this.taskService.getAllTasks().pipe(
      catchError(error => {
        return of();
      }),
    );

  }

  deleteTask(id: String){
    this.taskService.deleteTask(id).subscribe(
      (success) => { 
        this.alert.showAlertSuccess("Task deleted!");

      },
      (error) => this.alert.showAlertDanger("Error during delete task! - "+error)
    );
  }

}
