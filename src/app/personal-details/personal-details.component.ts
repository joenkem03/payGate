import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../core/api.service";
import { LogicReuseable } from "../core/logic.reuseable";

@Component({
	selector: 'app-personal-details',
	templateUrl: './personal-details.component.html',
	styleUrls: ['./personal-details.component.css']
})

export class PersonalDetailsComponent implements OnInit {
	personalDetailsForm: FormGroup;
	invalidEntry: boolean = false;
	loading: boolean;

	constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private logic: LogicReuseable) {}

	onSubmit() {
		this.loading = true;
		if (this.personalDetailsForm.invalid) {
			return;
		}

		const personalDetailsPayload = {
			// "BusinessName": this.personalDetailsForm.controls.businessName.value,
			// "EmailAddress": this.personalDetailsForm.controls.emailAddress.value,
			"BVN": this.personalDetailsForm.controls.bvn.value,
			"DateOfBirth": this.personalDetailsForm.controls.dateOfBirth.value
			// "FirstName": this.personalDetailsForm.controls.firstName.value,
			// "LastName": this.personalDetailsForm.controls.lastName.value,
			// "PhoneNumber": this.personalDetailsForm.controls.phoneNumber.value
		}

		let Form = JSON.stringify(personalDetailsPayload);
		this.apiService.updatePersonalDetails(Form).subscribe(data => {
			// debugger;
			console.log(data);
			console.log(data.status)
			if (data.status == "true") {
				this.logic.getMerchantUserDetails();
				this.logic.getSuccessNotification(data.message);
			} else {
				this.invalidEntry = true;
				this.logic.getErrorNotification("Operation not completed. Try again");
			}
			this.loading = false;
		});
	}

	ngOnInit() {
		if (this.logic.getLastName() === null) {
			this.personalDetailsForm = this.formBuilder.group({
				businessName: ['', Validators.required],
				emailAddress: ['', Validators.required],
				phoneNumber: ['', Validators.required],
				firstName: ['', Validators.required],
				lastName: ['', Validators.required],
				bvn: ['', Validators.required],
				dateOfBirth: ['', Validators.required]
			});
		} else {
			this.personalDetailsForm = this.formBuilder.group({
				businessName: [this.logic.getBusinessName(), Validators.required],
				emailAddress: [this.logic.getEmailAddress(), Validators.required],
				phoneNumber: [this.logic.getPhoneNumber(), Validators.required],
				firstName: [this.logic.getFirstName(), Validators.required],
				lastName: [this.logic.getLastName(), Validators.required],
				bvn: [this.logic.getBVN(), Validators.required],
				dateOfBirth: [this.logic.getDateOfBirth(), Validators.required]
			});
		}
	}
}