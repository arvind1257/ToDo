import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CentralDataService } from './services/centralData/central-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent,FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Client';
  centralData = inject(CentralDataService)
  ngOnInit(): void {
      this.centralData.sharedData$.subscribe((data)=>{
        if(Object.keys(data).length===0 && sessionStorage.getItem('token')!=null){
          this.centralData.updateData({
            name:sessionStorage.getItem("name"),
            role:sessionStorage.getItem("role"),
            email:sessionStorage.getItem("email"),
            id:sessionStorage.getItem("id")
          })
        }
      })
  }


}
