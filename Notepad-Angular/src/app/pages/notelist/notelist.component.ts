import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/notes.service';
import { Note } from 'src/app/shared/note.model';
import { MatDialog } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animate, style, transition, trigger, query, stagger} from '@angular/animations';
import { arrayRemove } from '@firebase/firestore';

  @Component({
    selector: 'app-notelist',
    templateUrl: './notelist.component.html',
    styleUrls: ['./notelist.component.css'],
    animations: [
      trigger('itemAnim', [
        // Entry Animation
        transition('void => *', [
          // Initial state
          style({
            height: 0,
            opacity: 0,
            transform: 'scale(0.85)',
            'margin-bottom': 0,

            // we have to expand out the padding properties
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0           
          }),
          // we first want to animate the spacing (which includes height and margin)
          animate('50ms', style({
            height: '*',
            'margin-bottom':'*', 
            paddingTop: '*',
            paddingBottom: '*',
            paddingLeft: '*',
            paddingRight: '*'
          })),
          animate(68)
        ]),

        transition('* => void', [
          //first scale up
          animate(50, style({
            transform: 'scale(1.05)'
          })),
           // then scale down back to normal size while begining to fade out
           animate(50, style({
            transform: 'scale(1)',
            opacity: 0.75
          })),
          // scale down and fade out completely
          animate('120ms ease-out', style({
            transform:'scale(0.68)',
            opacity: 0
          })),
          //then animate the spacing (which includes height, margin and padding)
          animate('150ms ease-out', style({
            opacity: 0,
            height: 0,
            'margin-bottom':'0', 
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0
          }))
        ])
      ]),
      trigger('listAnim', [
        transition('* => *', [
          query(':enter', [
            style({
              opacity: 0,
              height: 0
            }),
            stagger(100, [
              animate('0.2s ease')
            ])
          ], {
            optional: true
          })
      ])
    ])
   ]
  })
export class NotelistComponent implements OnInit {
  form!: FormGroup;
  noteList: Note[] = [];

  noteForm!: FormGroup;
  editForm!: FormGroup;

  public noteDetails: any;

  notes: any = [];
  temp:any;
  title!: string;
  desc!: string;
  noteObj: Note = {
    id: '',
    title: '',
    desc: ''
  }
  durationInSeconds = 5;
  id!: string;
  display: string = '';
  del: any;
  
  constructor(public dialog: MatDialog, 
    private notesService: NotesService,
    private _snackBar: MatSnackBar ) 
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

  ngOnInit(): void {
    // we want to retrieve all notes from NotesService
    this.getAllNotes();
  }

  resetForm(){
    this.id='';
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
      console.log('The dialog was closed');
    });
  }

  openConfirmDeleteForm(templateRef:any): void {
    const dialogRef = this.dialog.open(templateRef, { 
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');      
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: ['success']
    })
  }
  
 // Implement Get Note Details
  getNoteDetails(note: Note){
    this.noteDetails = note;
  }

  getAllNotes(){
    this.notesService.getNotes().subscribe((res: Note[]) => {
      this.notes = res;
    }, err => {
      alert('Error while fetching note data');
    })
  }


  delete(){
    this.notesService.deleteNote(this.del).then(() => {
    this.openSnackBar("Note Deleted Successfully", "ok");
    this.resetForm();
   })
 }

 deleteNote(note:Note){
  this.del = note;
 }

  addNote(){
    const { value } = this.noteForm;
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
    this.openSnackBar("Note Updated Successfully", "ok");
  }

  canSave(){
    let can;
    if(this.title != ''){
      can = true;
    }
    else{
      can = false;
    }
    return can;
  }

  filter(query: string){
    query = query.toLowerCase().trim();

    // split up the search query into individual words
    let terms: string[] = query.split(' '); //split on spaces
    //remove duplicate search terms

  }

  // removeDuplicates(arr: Array<any>) : Array<any><any> {
  //   let uniqueResults: Set<any> = new Set<any>
  //   // loop through the input array and
  //   arr.forEach(element =>  uniqueResults{
      
  //   });

  
  // }
}

