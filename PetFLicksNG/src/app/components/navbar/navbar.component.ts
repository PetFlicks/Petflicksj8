import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  menuOpen(){
console.log("menu clicked");
  }
  videoOpen(){
    console.log("video clicked");

  }
  acctOpen(){
    console.log("account clicked");

  }

}
