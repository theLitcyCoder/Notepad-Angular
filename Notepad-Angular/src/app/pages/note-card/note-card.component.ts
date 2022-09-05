import { Component, ElementRef, Input, OnInit,Renderer2, ViewChild } from '@angular/core';
import { Note } from 'src/app/shared/note.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {

  @Input() title!: string;
  @Input() desc!: string;

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;
  
  notes: any [] = [];
  
  constructor(private renderer: Renderer2, private notesService: NotesService) { }

  ngOnInit(): void {
  
  }

  ngAfterViewInit() {
      // Work out if there is a text overflow and if not, then hide truncator
      let bodyStyle = window.getComputedStyle(this.bodyText.nativeElement, null);
      let viewableHeight = parseInt(bodyStyle.getPropertyValue('height'), 8);
  
       if(this.bodyText.nativeElement.scrollHeight > viewableHeight){
         // if there is no text overflow, show the fade out truncator
         this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
       } else {
         // else (there is a text overflow), hide the fade out truncator
         this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
       }
  }

  deleteNote(note: Note){
    let decision = confirm("Are you sure you want to delete this note?");

    if (decision == true){
      this.notesService.deleteNote(note);
    }
  }

}
