import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Artifact } from 'src/app/interfaces/ArtifactInterface';

@Injectable({
  providedIn: 'root'
})
export class ArtifactService {

  private baseUrl = 'http://localhost:8080/artifact';

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  
  createArtifact(artifact: Artifact){
    const userEmail = this.cookieService.get('userEmail');
    artifact.createBy = userEmail;
    return this.http.post(this.baseUrl, artifact);
  }

  getArtifactsByTaskId(sourceTask: string){
    return this.http.get<Artifact[]>(this.baseUrl+"/list/"+sourceTask);
  }

}
