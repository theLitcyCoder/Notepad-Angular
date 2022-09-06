import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/shared/notes.service';
import { Note } from 'src/app/shared/note.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-notelist',
  templateUrl: './notelist.component.html',
  styleUrls: ['./notelist.component.css']
})
export class NotelistComponent implements OnInit {
 

  @Input() title!: string;
  @Input() desc!: string;

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText!: ElementRef<HTMLElement>;

  // notes: Note[] = new Array<Note>();
  notes: any [] = [];
constructor(private formBuilder: FormBuilder, private renderer: Renderer2, private notesService: NotesService) {
  
 }

ngAfterViewInit() {
  // // Work out if there is a text overflow and if not, then hide truncator
  // let bodyStyle = window.getComputedStyle(this.bodyText.nativeElement, null);
  // let viewableHeight = parseInt(bodyStyle.getPropertyValue('height'), 8);

  //  if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
  //    // if there is no text overflow, show the fade out truncator
  //    this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
  //  } else {
  //    // else (there is a text overflow), hide the fade out truncator
  //    this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
  //  }
}

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

  deleteNote(note: Note){
    let decision = confirm("Are you sure you want to delete this note?");

    if (decision == true){
      this.notesService.deleteNote(note);
      console.log(note.desc)
    }
  }

}
