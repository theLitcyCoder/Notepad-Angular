import { Injectable } from '@angular/core';
import { Note } from 'src/app/shared/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  constructor() {
   
   }

  getAll(){
    return this.notes;
  }

  get(id: number){
    return this.notes[id];
  }

  getId(note: Note){
    return this.notes.indexOf(note);
  }

  add(note: Note){
    // this method will add a note to the notes array and return the id of the note
    // where the id = index
   
    console.log("from add", "title: ", note)
    let newLength = this.notes.push(note);
    let index = newLength;
    console.log("index", index)
    return index;
  }

  update(id: number, title: string, body: string){
    let note = this.notes[id];
    note.title = title;
    note.body = body;
    
  }

  delete(id: number){
    this.notes.splice(id, 1);
  }
}
