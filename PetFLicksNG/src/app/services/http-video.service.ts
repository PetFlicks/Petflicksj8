import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class HttpVideoService {
  url: string = "http://localhost:8081/api/";


  constructor(private httpClient: HttpClient) { }


  uploadFile(fileEntry: File): Observable<HttpEvent<any>> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);

    const req = new HttpRequest('POST', this.url + "upload/", formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }
  getAllVids(): Observable<Video[]> {// queery params may need more
    return this.httpClient.get<Video[]>(this.url + 'videos').pipe(map(resp => resp as Video[]));
  }
  async getVideos(): Promise<Video[]>{
    let resp = await fetch(this.url + 'videos/' );

  if (resp.status===200) {
    return await resp.json();
  }
  console.log(resp.json);
return resp.json();
  }

}


