import { Component, inject,OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MasterService } from '../../services/master.service';
import { Message } from '../../interface/message';

@Component({
  selector: 'app-home',
  imports: [DatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
    messageList: Message[] =[]
    rightContentView: String = "create"
    masterService = inject(MasterService)
    ngOnInit(): void {
        this.masterService.getMessage().subscribe((result:any)=>{
          this.messageList = result;
          result.map((item:any)=>{item.createdDate = new Date(item.createdDate);item.updatedDate = new Date(item.updatedDate)})
        })
    }

    createNote(){
      this.rightContentView="create"
    }

    backButton(){
      this.rightContentView="empty"
    }
}

