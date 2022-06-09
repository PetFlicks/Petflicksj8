import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/models/video';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @Input() video2!: Video;
  @Output() emits = new EventEmitter();
  

  constructor() { }

  ngOnInit(): void {
    console.log(this.video2);

  }

}
