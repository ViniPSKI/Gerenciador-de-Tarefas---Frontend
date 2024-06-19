import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/interfaces/UserInterface';

import { catchError, switchMap, take, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiServiceService } from '../api-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private baseUrl = 'http://localhost:8080/user'

  constructor(private http: HttpClient, private cookieService: CookieService, private apiService: ApiServiceService) { }

  createUser(user: User){
    return this.http.post(this.baseUrl, user).pipe(take(1));
  }

  getUser(){
    const userEmail = this.cookieService.get('userEmail');
    const updateUrl = `${this.baseUrl}/${userEmail}`;

    return this.http.get(updateUrl).pipe();
  }

  editUser(user: User){
    const userEmail = this.cookieService.get('userEmail');
    const updateUrl = `${this.baseUrl}/${userEmail}`;

    return this.http.put(updateUrl, user).pipe(
      take(1),
      switchMap(() => this.apiService.auth(user)),
      tap((response: { token: string }) => {
        const jwt = response.token;
        this.apiService.setToken(jwt);
      }),
      catchError((error: any) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  deleteUser(){
    const userEmail = this.cookieService.get('userEmail');
    const updateUrl = `${this.baseUrl}/${userEmail}`;
    return this.http.delete(updateUrl).pipe();
  }

}
