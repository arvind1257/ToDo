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
}
