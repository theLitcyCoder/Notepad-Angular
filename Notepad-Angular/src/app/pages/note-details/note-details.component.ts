import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotesService } from 'src/app/shared/notes.service';
import { Note } from 'src/app/shared/note.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {
  
  noteForm!: FormGroup;
  noteObj: Note = {
    id: '',
    title: '',
    desc: ''
  }

  // title: string='';
  // body: string='';
  // note!: Note;
  // new: boolean = false;
  // noteId: number = 0;
  // newPost:any = []
  // yh:any

  constructor(private notesService: NotesService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { 
    this.noteForm = formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required]
    })
  }

  ngOnInit(): void { }

  addNote(){
    const { value } = this.noteForm
    console.log("AddNote from details: ", value);

    this.noteObj.id = '';
    this.noteObj.title = value.title;
    this.noteObj.desc = value.desc;

    this.notesService.addNote(this.noteObj).then((note) => {
      if(note) {
        alert('Note Added Successfully');
        this.router.navigateByUrl('/');
        this.noteForm.reset();
      }
    })
  }
















  // ngOnInit(): void {
  //  // 
  //   // this.route.params.subscribe((params:Params) => {
    
  //   //   if(params['id']){
       
  //   //     this.note = this.notesService.get(params['id'])
  //   //     this.noteId = params['id'];
  //   //     this.new = false;
  //   //   } else {
  //   //     this.new = true;
  //   //   }
  //   // })
  // }
  
  //  clearFields(){
  //   //  this.note.title='';
  //   //  this.note.body='';
  //   }

  //  getNoteForm(form:any){
  //   console.log(form.value)
  //   const value = form.value
  //   this.newPost={
  //     title:form.value['Title'],
  //     body: form.value['Body']
  //   } 
    
   
  //  }

  //  cancel(){
  //   this.router.navigateByUrl('/');
  //   // this.note.body = ''
  //   // this.title =''
  //  }


  //  canSave(title:string,body:string){
  //   let tasks:any = []
   
  //   if(title != '' && body != ''){
  //     tasks.push({tCon:title, bCon:body})
  //     console.log(tasks)
  //   }

  //   if(this.new){
  //     //we want to find out if we are creating na new note or editing an existing one
    
   
  //    this.router.navigateByUrl('/');
  //  } else {
    
  //    this.notesService.update(this.noteId, tasks.tCon, tasks.bCon);
   

  //  }
  //  this.router.navigateByUrl('/');
  //  }
   

}
