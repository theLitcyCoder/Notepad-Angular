import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotesService } from 'src/app/shared/notes.service';
import { Note } from 'src/app/shared/note.model';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar,  MatSnackBarConfig,MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

  @Component({
    selector: 'app-notelist',
    templateUrl: './notelist.component.html',
    styleUrls: ['./notelist.component.css']
  })
export class NotelistComponent implements OnInit {
  form!: FormGroup;
  noteList: Note[] = [];

  noteForm!: FormGroup;
  editForm!: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  public noteDetails: any;

  notes: any = [];
  temp:any
  title!: string;
  desc!: string
  noteObj: Note = {
    id: '',
    title: '',
    desc: ''
  }
  durationInSeconds = 5;

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText!: ElementRef<HTMLElement>;
    id!: string;

  constructor(public dialog: MatDialog, 
    private renderer: Renderer2, 
    private notesService: NotesService,
    private _snackBar: MatSnackBar
  
    ) 
    {
      this.noteForm = new FormGroup({
        title: new FormControl(),
        desc: new FormControl()
    });
    this.editForm = new FormGroup({
      editTitle: new FormControl(),
      editDesc: new FormControl()
  });
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
  this.getAllNotes();
  }

  resetForm(){
    this.id=''
    this.title='';
    this.desc='';
  }

  openAddForm(templateRef:any): void {
    const dialogRef = this.dialog.open(templateRef, { 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  openUpdateForm(templateRef:any): void {
    const dialogRef = this.dialog.open(templateRef, { 
    });
    dialogRef.beforeClosed().subscribe(result => {

      console.log('The dialog was closed',this.title);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['success']
    })
  }
  

//  Implement Get Note Details
  getNoteDetails(note: Note){
    this.noteDetails = note;
    console.log(this.noteDetails)
  }

  getAllNotes(){
    this.notesService.getNotes().subscribe((res: Note[]) => {
      console.log(res);
      this.notes = res;
    }, err => {
      alert('Error while fecthing note data')
    })
  }

  deleteNote(note: Note){
    let decision = confirm("Are you sure you want to delete this note? ");

    if (decision == true){
       this.notesService.deleteNote(note).then();
       console.log(note)
    }
  }

  addNote(){
    const { value } = this.noteForm
    this.noteObj.id =  '';
    this.noteObj.title = value.title;
    this.noteObj.desc = value.desc;  
  
     this.notesService.addNote(this.noteObj).then(() => {
      this.openSnackBar("Note Added Successfully", "ok")
        this.resetForm();
    })
  }
  
  updateNote(note: Note){
    const { value } = this.editForm;
    this.noteObj.id = note.id;

    this.noteObj.title = value.editTitle;
    this.noteObj.desc = value.editDdesc;
    this.notesService.updateNote(note, this.noteObj);
    this.resetForm();
    this.openSnackBar("Note Updated Successfully", "ok")
}
}

