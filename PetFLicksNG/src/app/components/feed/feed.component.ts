import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from 'src/app/models/video';
import { HttpVideoService } from 'src/app/services/http-video.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  @Input() videos!: Video[];

  constructor(private http: HttpVideoService) { }

  ngOnInit() {
     this.http.getAllVids().subscribe(resp =>  this.videos = resp);
  }
  // async ngOnInit(): Promise<void> {
  //     this.videos = await this.http.getVideos();
  //     console.log(this.videos);
  // }

}
