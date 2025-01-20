import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MasterService } from '../../services/master.service';
import { CentralDataService } from '../../services/centralData/central-data.service';

@Component({
	selector: 'app-login',
	imports: [RouterModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css'
})

export class LoginComponent {
	centraldata = inject(CentralDataService)
	masterService = inject(MasterService)
	router = inject(Router)
	isLoading = signal<boolean>(false);
	page = signal<String>("login")
	changePage(page1: String) {
		this.page.set(page1);
	}

	SignUpForm: FormGroup = new FormGroup({
		name: new FormControl(""),
		role: new FormControl("user"),
		email: new FormControl(""),
		confirm: new FormControl(""),
		password: new FormControl("")
	})

	LoginForm: FormGroup = new FormGroup({
		email: new FormControl(""),
		password: new FormControl("")
	})

	onSignup() {
		this.isLoading.set(true)
		const signupData = this.SignUpForm.value
		this.masterService.signupUser(signupData).subscribe((res: any) => {
			if(res.status == 200){
				alert(`Success: ${res.message}`)
				this.SignUpForm.reset()
				this.page.set("login")
				this.isLoading.set(false);
			}else{
				this.isLoading.set(false);
				alert(`Error ${res.status}: ${res.message}`);
			}
		})
	}

	onLogin() {
		this.isLoading.set(true)
		const loginData = this.LoginForm.value
		this.masterService.loginUser(loginData).subscribe((res: any) => {
			if (res.status == 200) {
				sessionStorage.setItem("token", res.token)
				sessionStorage.setItem("role", res.User.role)
				sessionStorage.setItem("name", res.User.name)
				sessionStorage.setItem("email", res.User.email)
				sessionStorage.setItem("id", res.User._id)
				this.centraldata.updateData({ name: res.User.name, role: res.User.role, email: res.User.email, id: res.User._id });
				alert(`Success: ${res.message}`)
				this.LoginForm.reset();
				this.router.navigateByUrl("dashboard")
			}
			else {
				this.isLoading.set(false);
				alert(`Error ${res.status}: ${res.message}`);
				this.LoginForm.reset();
			}
		})
	}
}
