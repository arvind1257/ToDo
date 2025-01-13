import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from '../interface/message';


@Injectable({
  providedIn: 'root'
})
export class MasterService {
  constructor(private http:HttpClient) { }
  
  getMessage():Observable<Message>{
    return this.http.get<Message>("http://localhost:5000/message/list")
  }

  postMessage(body:any){
    return this.http.post("http://localhost:5000/message/new",body);
  }

  deleteMessage(id:any){
    return this.http.delete(`http://localhost:5000/message/delete/${id}`);
  }

  updateMessage(id:any,body:any){
    return this.http.patch(`http://localhost:5000/message/update/${id}`,body)
  }

}
