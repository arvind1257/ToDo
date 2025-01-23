import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CentralDataService } from '../../services/centralData/central-data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle  } from '@fortawesome/free-solid-svg-icons';
import { MasterService } from '../../services/master.service';
import { User } from '../../interface/message';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-header',
  imports: [RouterModule,FontAwesomeModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  faUserCircle = faUserCircle
  centralData = inject(CentralDataService)
  masterService = inject(MasterService)
  router = inject(Router)
  isLogin = signal<boolean>(false);
  user:any = {}
  openModel = signal<boolean>(false)
  userList = signal<User[]>([]);
  userID = signal<String>("");

  ngOnInit() {
    this.centralData.sharedData$.subscribe((data) => {
      this.isLogin.set(Object.keys(data).length>0)
      this.user = data;
      console.log(this.user);
    });
  }
  logout(){
    this.centralData.updateData({});
    sessionStorage.clear();
    this.router.navigateByUrl("/")
  }

  openUserList(){
    if(this.userID()!=""){
    this.router.navigateByUrl(`/user/${this.userID()}`)
    this.userID.set("");
  }
  else{
    alert("Invalid, kindly select a user to view.")
  }
  }

  onUserClick(){
    this.masterService.getAllUserList().subscribe((res:any)=>{
      if(res.status==200){
        this.userList.set(res.userList.filter((item:any)=>item._id!=sessionStorage.getItem('id')));
      }
      else{
        alert(`Error ${res.status} : ${res.message}`);
      }
    })
  }
}

