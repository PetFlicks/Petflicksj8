import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MatButton } from '@angular/material/button';
import { HttpVideoService } from 'src/app/services/http-video.service';

@Component({
  selector: 'app-upload-video',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.css']
})
export class UploadVideoComponent {
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
    if (this.fileEntry !== undefined) {
      console.log(this.fileEntry);

      this.fileEntry.file(file => {
        this.http.uploadFile(file).subscribe(data => {
          console.log("video Successfully uploaded");
        });
      })
    }
  }
}