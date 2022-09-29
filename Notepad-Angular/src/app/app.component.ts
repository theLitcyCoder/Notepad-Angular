import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'notepad';
  go:boolean = false
constructor() 
  {}

ngOnInit(): void {
}

menuControl(){
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelectorAll('.nav_link');
  this.go = !this.go
  if(navToggle != null){
    console.log("yes")
    navToggle.addEventListener('click', () => {
      document.body.classList.toggle('nav-open');
  })
  }else{
   
    console.log("no")
  }


  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          document.body.classList.remove('nav-open');
      })
  })
  

}

}