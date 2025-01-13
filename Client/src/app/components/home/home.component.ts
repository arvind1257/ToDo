import { Component, inject,OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { Message } from '../../interface/message';
import { FormsModule } from '@angular/forms';
import moment from 'moment'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlusSquare,faSignInAlt,faCheck,faTrash,faChevronCircleLeft  } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [DatePipe,FormsModule,FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  faPlusSquare=faPlusSquare
  faSignInAlt =faSignInAlt 
  faCheck=faCheck
  faTrash=faTrash
  faChevronCircleLeft=faChevronCircleLeft
    isLoading: boolean = true
    messageList: Message[] =[]
    id : String = ""
    title : String  = ""
    note : String =  ""
    updatedDate : Date = new Date()
    rightContentView: String = "empty"
    masterService = inject(MasterService)
    ngOnInit(): void {
        this.initializeValue();
    }
    initializeValue(){
      this.masterService.getMessage().subscribe((result:any)=>{
        console.log(result);
        this.messageList = result;
        this.isLoading=false;
        result.map((item:any)=>{item.createdDate = new Date(item.createdDate);item.updatedDate = new Date(item.updatedDate)})
      })
    }
    displayDate(date1:Date){
      return moment(date1).fromNow();
    }
    createNote(){
      this.rightContentView="create"
      this.id=""
      this.title=""
      this.note=""
      this.updatedDate = new Date();
    }

    openNote(id:any){
      this.rightContentView = id;
      this.messageList.filter((item:any)=>item._id==id).map((item)=>{
        this.id=item._id;
        this.title=item.title;
        this.note=item.note;
        this.updatedDate=item.updatedDate;
        return true;
      })
    }

    backButton(){
      this.rightContentView="empty"
      this.id=""
      this.title=""
      this.note=""
      this.updatedDate = new Date();
    }

    deleteNote(){
      let note = this.messageList.filter((item)=>item._id==this.id)[0];
      let status = confirm("Do you want to delete this note \""+note.title+"\"? ");
      if(status){
        this.isLoading=true
        this.masterService.deleteMessage(this.id).subscribe((res:any)=>{
          if(res.status==200){
            this.initializeValue()
            this.backButton()
            alert(`Success: ${res.message}`)
          }
          else{
            this.isLoading=false;
            alert(`Error ${res.status}: ${res.message}`);
          }
        })
      }
    }

    updateNote(){
      const body = {
        title:this.title,
        note:this.note,
        updateDate:new Date().getTime()
      }
      let status = confirm("Do you want to update this note? ");
      if(status){
        this.isLoading=true
        this.masterService.updateMessage(this.id,body).subscribe((res:any)=>{
          if(res.status==200){
            this.initializeValue()
            this.backButton()
            alert(`Success: ${res.message}`)
          }
          else{
            this.isLoading=false;
            alert(`Error ${res.status}: ${res.message}`);
          }
        })
      }
    }

    onSaveNote(){
      const body = {
        title:this.title,
        note:this.note,
        createdDate:new Date().getTime(),
        updateDate:new Date().getTime()
      }

      if(this.title!="" && this.note!=""){
        this.isLoading=true
      this.masterService.postMessage(body).subscribe((res:any)=>{
        if(res.status==200){
          alert(`Success: ${res.message}`)
          this.initializeValue()
          this.backButton()
        }
        else{
          this.isLoading=false;
          alert(`Error ${res.status}: ${res.message}`);
        }
      })
    }
    else{
      alert("Kindly fill Title and Message.")
    }
    }
}

