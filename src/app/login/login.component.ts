import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../core/api.service";
import { LogicReuseable } from "../core/logic.reuseable";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

	loginForm: FormGroup;
	invalidLogin: boolean = false;
	errorMessage: string;
	loading: boolean;

	constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private logic: LogicReuseable) { 
		this.logic.Logout();
	}

	onSubmit() {
		this.invalidLogin = false;
		this.loading = true;
		if (this.loginForm.invalid) {
			return;
		}

		let username = this.loginForm.controls.username.value;
		let password = this.loginForm.controls.password.value;

		this.apiService.login(username,password).subscribe(data => {
			window.localStorage.setItem("username", this.loginForm.controls.username.value);
			window.localStorage.setItem("accessToken", data.access_token);
			
			this.loading = false;
			if (data.access_token) {
				// get merchant registration status
				// this.logic.getMerchantUserRegistrationStatus();
				// get merchant details here
				// this.logic.getMerchantUserDetails();
				// if (this.logic.getIsLive() == true) {
				this.router.navigate(['dashboard']);
				// } else {
				// 	this.router.navigate(['getting-started']);
				// }
			} else {
				this.invalidLogin = true;
				this.errorMessage = "Invalid username/password. Retry";
			}

		}, error => {
			this.invalidLogin = true;
			this.errorMessage = "Invalid username/password. Retry";
			this.loading = false;
		});
	}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('1-column');
		body.classList.add('bg-full-screen-image');
		body.classList.add('blank-page');
		body.classList.add('blank-page');

		window.localStorage.removeItem('token');
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.compose([Validators.required])],
			password: ['', Validators.required]
		});
	}

	ngOnDestroy(): void {
		const body = document.getElementsByTagName('body')[0];
		body.classList.remove('1-column');
		body.classList.remove('bg-full-screen-image');
		body.classList.remove('blank-page');
		body.classList.remove('blank-page');
	}
}
