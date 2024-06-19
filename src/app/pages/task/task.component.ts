import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Artifact } from 'src/app/interfaces/ArtifactInterface';
import { Task } from 'src/app/interfaces/TaskInterface';
import { ArtifactService } from 'src/app/services/artifact/artifact.service';
import { TaskServiceService } from 'src/app/services/task/task-service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  task: Task | any;
  idTask: String | any;
  artifact: Artifact = {sourceTask: "", annotation: "", createBy: ""}
  annotation: String = "";

  artifacts$: Observable<Artifact[]> = new Observable<Artifact[]>();

  constructor(
    private taskService: TaskServiceService, 
    private route: ActivatedRoute, 
    private artifactService: ArtifactService
  ){}

  ngOnInit(): void {

    this.route.params.subscribe(
      (params: any) =>{
        this.idTask = params['id'];
      }
    );

    this.task = this.route.snapshot.data['task'];
    
    this.artifacts$ = this.artifactService.getArtifactsByTaskId(this.idTask).pipe(
      catchError(error => {
        return of();
      }),
    );

  }

  publishArtifact(){
    if(this.annotation != ""){
      this.artifact.annotation = this.annotation;
      this.artifact.sourceTask = this.idTask;
      this.artifactService.createArtifact(this.artifact).subscribe(
        (success) => {
          this.annotation = ""
          this.ngOnInit()
        },
        (error) =>{
          console.log(error)
        }
      );
    }

  }

}
