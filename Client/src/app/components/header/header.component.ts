import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CentralDataService } from '../../services/centralData/central-data.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUserCircle  } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-header',
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  faUserCircle = faUserCircle
  centralData = inject(CentralDataService)
  isLogin = signal<boolean>(false);
  user:any = {}

  ngOnInit() {
    this.centralData.sharedData$.subscribe((data) => {
      this.isLogin.set(Object.keys(data).length>0)
      this.user = data;
      console.log(this.user);
    });
  }
  router = inject(Router);
  logout(){
    this.centralData.updateData({});
    sessionStorage.clear();
    this.router.navigateByUrl("/")
  }
}

