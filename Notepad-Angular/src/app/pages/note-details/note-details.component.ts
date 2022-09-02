import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Note } from 'src/shared/note.model';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  note: Note = new Note;

  constructor() { 
  }

  ngOnInit(): void {
   
  }
  
   clearFields(){
     this.note.title='';
     this.note.body='';
   }

   onSubmit(form: NgForm){
    console.log(form);
   }

}
