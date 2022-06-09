import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MatButton } from '@angular/material/button';
import { HttpVideoService } from 'src/app/services/http-video.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
  progress = 0;
  message = '';
  fileInfos: Observable<any> | undefined;

  showProgress = false;
  upProgress = false;

  fileUploaded: boolean = false;
  fileEntry: FileSystemFileEntry | undefined;

  constructor(private http: HttpVideoService) {

  }


  public files: NgxFileDropEntry[] = [];


  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        this.fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        this.fileEntry.file((file: File) => {

          this.fileUploaded = true;


        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any) {// testing drag and drop
    console.log(event);
  }

  public fileLeave(event: any) {// testing drag drop
    console.log(event);
  }

  uploadVideo() {
    this.showProgress = true;
    if (this.fileEntry !== undefined) {
      console.log(this.fileEntry);

      this.fileEntry.file(file => {
        this.http.uploadFile(file).subscribe(event => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total) {
              const total: number = event.total;
              this.progress = Math.round(100 * event.loaded / total);
            }
            else {
              //this.progress = Math.round(100 * event.loaded / 100);
            }
          } else if (event instanceof HttpResponse) {
            //this.message = event.body.message;
            //this.fileInfos = this.uploadService.getFiles();
          }
        });
      })
    }
  }
}