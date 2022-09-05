import { Injectable } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { doc, addDoc, updateDoc, deleteDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  constructor(private afs: Firestore) {
   
   }

  //Add New Note
  addNote(note: Note){
    note.id = doc(collection(this.afs, 'id')).id;
   
    console.log("Note Added - Note ID ", note.id)
    return addDoc(collection(this.afs, 'Notes'), note);
  }

  //Get All Notes
  getNotes(): Observable<Note[]>{
   let notesRef = collection(this.afs, 'Notes');

   console.log("All Notes - notesRef ", notesRef)
   return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
  }

  //Delete a Note
  deleteNote(note: Note){
    let docRef = doc(this.afs, 'Notes/${note.id}');
   
    console.log("Note Deleted - docRef ", docRef)
    return deleteDoc(docRef);
  }

  //Update a Note
  updateNote(note: Note, notes: any){
    let docRef = doc(this.afs, 'Notes/${note.id}');
    console.log("Note Updated - docRef ", docRef)
    return updateDoc(docRef, notes);
  }

  
 

  

  
}
