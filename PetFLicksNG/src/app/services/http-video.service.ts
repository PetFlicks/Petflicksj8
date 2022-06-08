import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileSystemFileEntry } from 'ngx-file-drop';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpVideoService {
  url: string = "http://localhost:8081/api/upload/";


  constructor(private httpClient: HttpClient) { }


  uploadFile(fileEntry: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', fileEntry, fileEntry.name);

    return this.httpClient.post(this.url, formData);
   
    
  }
}


