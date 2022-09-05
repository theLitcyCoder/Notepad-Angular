import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/notes.service';
import { Note } from 'src/app/shared/note.model';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {

  // notes: Note[] = new Array<Note>();
  notes: any [] = [];
  constructor(private notesService: NotesService) { }

  ngOnInit(): void {
    // we want to retrieve all notes from NotesService
  //  this.notes = this.notesService.getNotes(); 
  this.getAllNotes();
  }

  getAllNotes(){
    this.notesService.getNotes().subscribe((res: Note[]) => {
      console.log(res);
      this.notes = res;
    })
  }
}
