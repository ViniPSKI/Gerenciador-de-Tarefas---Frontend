import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Task } from 'src/app/interfaces/TaskInterface';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private baseUrl = 'http://localhost:8080/task';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  createTask(task: Task){
    const userEmail = this.cookieService.get('userEmail');
    task.createBy = userEmail;
    return this.http.post(this.baseUrl, task);
  }

  getAllTasks(){
    return this.http.get<Task[]>(this.baseUrl);
  }

  getTaskById(id: String){
    return this.http.get<Task>(this.baseUrl+"/"+id)
  }

  deleteTask(id: String){
    return this.http.delete(this.baseUrl+"/"+id)
  }

  editTask(task: Task){
    const userEmail = this.cookieService.get('userEmail');
    const updateUrl = `${this.baseUrl}/${task.id}`;
    task.createBy = userEmail;
    return this.http.put(updateUrl, task);
  }

}
