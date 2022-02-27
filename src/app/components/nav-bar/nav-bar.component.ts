import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  githubUrl = "https://github.com/JuAmPi27?tab=repositories";

  constructor() { }

  ngOnInit(): void {
  }

}
