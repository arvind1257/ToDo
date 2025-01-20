import { Component, inject,OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { Message } from '../../interface/message';
import { FormsModule } from '@angular/forms';
import moment from 'moment'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusSquare,faSignInAlt,faCheck,faTrash,faChevronCircleLeft  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule,FontAwesomeModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  faPlusSquare=faPlusSquare
  faSignInAlt =faSignInAlt 
  faCheck=faCheck
  faTrash=faTrash
  faChevronCircleLeft=faChevronCircleLeft
    isLoading = signal<boolean>(true)
    messageList = signal<Message[]>([])
    id = signal<String>("")
    title = signal<String>("")
    note = signal<String>("")
    updatedDate = signal<Date>(new Date())
    rightContentView = signal<String>("empty")
    masterService = inject(MasterService)
    ngOnInit(): void {
        this.initializeValue();
    }
    initializeValue(){
      this.masterService.getMessage().subscribe((result:any)=>{
        console.log(result);
        this.messageList.set(result);
        this.isLoading.set(false);
        result.map((item:any)=>{item.createdDate = new Date(item.createdDate);item.updatedDate = new Date(item.updatedDate)})
      })
    }
    displayDate(date1:Date){
      return moment(date1).fromNow();
    }
    createNote(){
      this.rightContentView.set("create")
      this.id.set("")
      this.title.set("")
      this.note.set("")
      this.updatedDate.set(new Date())
    }

    openNote(id:any){
      this.rightContentView.set(id);
      this.messageList().filter((item:any)=>item._id==id).map((item)=>{
        this.id.set(item._id);
        this.title.set(item.title);
        this.note.set(item.note);
        this.updatedDate.set(item.updatedDate);
        return true;
      })
    }

    backButton(){
      this.rightContentView.set("empty")
      this.id.set("")
      this.title.set("")
      this.note.set("")
      this.updatedDate.set(new Date())
    }

    deleteNote(){
      let note = this.messageList().filter((item)=>item._id==this.id())[0];
      let status = confirm("Do you want to delete this note \""+note.title+"\"? ");
      if(status){
        this.isLoading.set(true)
        this.masterService.deleteMessage(this.id()).subscribe((res:any)=>{
          if(res.status==200){
            this.initializeValue()
            this.backButton()
            alert(`Success: ${res.message}`)
          }
          else{
            this.isLoading.set(false);
            alert(`Error ${res.status}: ${res.message}`);
          }
        })
      }
    }

    updateNote(){
      const body = {
        title:this.title(),
        note:this.note(),
        updatedDate:new Date().getTime()
      }
      let status = confirm("Do you want to update this note? ");
      if(status){
        this.isLoading.set(true)
        this.masterService.updateMessage(this.id(),body).subscribe((res:any)=>{
          if(res.status==200){
            this.initializeValue()
            this.backButton()
            alert(`Success: ${res.message}`)
          }
          else{
            this.isLoading.set(false);
            alert(`Error ${res.status}: ${res.message}`);
          }
        })
      }
    }

    onSaveNote(){
      const body = {
        title:this.title(),
        note:this.note(),
        createdDate:new Date().getTime(),
        updatedDate:new Date().getTime()
      }
      console.log(body);
      if(this.title()!="" && this.note()!=""){
        this.isLoading.set(true)
      this.masterService.postMessage(body).subscribe((res:any)=>{
        if(res.status==200){
          alert(`Success: ${res.message}`)
          this.initializeValue()
          this.backButton()
        }
        else{
          this.isLoading.set(false)
          alert(`Error ${res.status}: ${res.message}`)
        }
      })
    }
    else{
      alert("Kindly fill Title and Message.")
    }
    }
}


