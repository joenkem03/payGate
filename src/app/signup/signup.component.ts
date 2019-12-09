import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../core/api.service";
import { PasswordStrengthValidator } from "../password.strength.validators";
import { LogicReuseable } from "../core/logic.reuseable";


@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
  	styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit, OnDestroy {
	signupForm: FormGroup;
	invalidSignup: boolean = false;
	errorMessage: string;
	loading: boolean;
	
	constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private logic: LogicReuseable) {
		// console.log(window.localStorage.getItem('identificationNumber'));
	}
	
	onSubmit() {
		this.loading = true;
		this.invalidSignup = false;
		if (this.signupForm.invalid) {
			return;
		}

		// check if phone number and nOKphone number's are the same
		if ( this.signupForm.controls.password.value != this.signupForm.controls.confirmPassword.value ) {
			this.invalidSignup = true;
			this.loading = false;
			console.log("Password mismatch!. Check and retry");
			this.errorMessage = "Password mismatch!. Check and retry";
			// alert("Password mismatch!. Check and retry");
			return;
		}

		if (this.signupForm.controls.termsAndConditions.value == false) {
			this.logic.getErrorNotification("You must accept our terms and conditions to continue");
			return;
		}

		const signupPayload = {
			// "FirstName": this.signupForm.controls.firstName.value,
			// "LastName": this.signupForm.controls.lastName.value,
			"BusinessName": this.signupForm.controls.applicationName.value,
			// "PhoneNumber": this.signupForm.controls.phoneNumber.value,
			"Email": this.signupForm.controls.emailAddress.value,
			"Password": this.signupForm.controls.password.value,
			"ConfirmPassword": this.signupForm.controls.confirmPassword.value
		}

		// const emailPayload = {
		// 	"Phone": "",
		// 	"Email": this.signupForm.controls.emailAddress.value,
		// 	"SenderEmail": "admin@ercasng.com",
		// 	"From": "GUST",
		// 	"Message": "Thanks for registering on GUST"
		// }

		let Form = JSON.stringify(signupPayload);
		this.apiService.signup(Form).subscribe(data => {
			// debugger;
			if (data.response == 1) {
				let username = this.signupForm.controls.emailAddress.value;
				let password = this.signupForm.controls.password.value;
				this.apiService.login(username,password).subscribe(logindata => {
					window.localStorage.setItem("username", this.signupForm.controls.emailAddress.value);
					window.localStorage.setItem("accessToken", logindata.access_token);
					this.loading = false;
					if (logindata.access_token) {
						this.logic.getMerchantUserDetails();
						this.router.navigate(['getting-started']);
					} else {
						this.router.navigate(['login']);
					}
				});
			} else {
				this.invalidSignup = true;
				this.loading = false;
				this.errorMessage = "Something went wrong. Retry!"; // data.message;
			}
		}, error => {
			this.invalidSignup = true;
			this.errorMessage = "Something went wrong. Retry";
			this.loading = false;
		});
	}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('1-column');
		body.classList.add('bg-full-screen-image');
		body.classList.add('blank-page');
		body.classList.add('blank-page');
		
		this.signupForm = this.formBuilder.group({
			// firstName: ['', Validators.required],
			// lastName: ['', Validators.required],
			// phoneNumber: ['', Validators.required],
			applicationName: ['', Validators.required],
			emailAddress: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, PasswordStrengthValidator]],
			confirmPassword: ['', Validators.required],
			termsAndConditions: [false, Validators.requiredTrue]
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


