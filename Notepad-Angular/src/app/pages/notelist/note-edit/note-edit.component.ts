import { Component, ElementRef, Input, OnInit,Output,Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {

 editForm!: FormGroup;
  noteObj: Note = {
    id: '',
    title: '',
    desc: ''
  }
  notes: any = [];
//   constructor(private renderer: Renderer2, private notesService: NotesService) { }
constructor(private formBuilder: FormBuilder, private renderer: Renderer2, private notesService: NotesService) {
    this.editForm = formBuilder.group({
      editTitle: ['', Validators.required],
      editDesc: ['', Validators.required]
    })
   }
  ngOnInit(): void {
  
  }

  
  
  updateNote(note: Note){
    const { value } = this.editForm;
    console.log("Update Note: ", value);
    (this.noteObj.id = note.id),
    (this.noteObj.title = value.editTitle),
    (this.noteObj.desc = value.editDesc);
    
    this.notesService.updateNote(note, this.noteObj).then(() => {
        alert("Note updated succesfully")
    })
    this.editForm.reset()

  }
}
//   ngAfterViewInit() {
//       // Work out if there is a text overflow and if not, then hide truncator
//       let bodyStyle = window.getComputedStyle(this.bodyText.nativeElement, null);
//       let viewableHeight = parseInt(bodyStyle.getPropertyValue('height'), 8);
  
//        if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
//          // if there is no text overflow, show the fade out truncator
//          this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
//        } else {
//          // else (there is a text overflow), hide the fade out truncator
//          this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
//        }
//   }

//   deleteNote(note: Note){
//     let decision = confirm("Are you sure you want to delete this note?");

//     if (decision == true){
//       this.notesService.deleteNote(note);
//     }
//   }

// }
