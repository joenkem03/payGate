import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../core/api.service";
import { ToastrService } from "ngx-toastr";
import { LogicReuseable } from '../core/logic.reuseable';

@Component({
	selector: 'app-business-details',
	templateUrl: './business-details.component.html',
	styleUrls: ['./business-details.component.css']
})

export class BusinessDetailsComponent implements OnInit {
	businessDetailsForm: FormGroup;
	invalidEntry: boolean = false;
	errorMessage: string;
	successMessage: string;
	loading: boolean;

	constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private toastr: ToastrService, private logic: LogicReuseable) {}

	onSubmit() {
		this.loading = true;
		if (this.businessDetailsForm.invalid) {
			return;
		}

		const businessDetailsPayload = {
			// "BussinessName": this.businessDetailsForm.controls.businessName.value,
			"BussinessEmail": this.businessDetailsForm.controls.emailAddress.value,
			"BussinessPhoneNumber": this.businessDetailsForm.controls.phoneNumber.value,
			"BussinessDescription": this.businessDetailsForm.controls.businessDescription.value,
			"WebsiteLink": this.businessDetailsForm.controls.websiteUrl.value,
			"BussinessAddress": this.businessDetailsForm.controls.businessAddress.value,
			"PackageId": this.businessDetailsForm.controls.businessType.value,
			"CompanyRegistrationNumber": this.businessDetailsForm.controls.businessNumber.value,
			"BVN": this.logic.getBVN()
		}
		
		console.log(businessDetailsPayload);
		let Form = JSON.stringify(businessDetailsPayload);
		this.apiService.updateBusinessDetails(Form).subscribe(data => {
			// debugger;
			if (data.status == "true") {
				this.logic.getMerchantUserDetails();
				this.logic.getSuccessNotification(data.message);
			} else {
				this.invalidEntry = true;
				this.logic.getErrorNotification("Record not saved. Retry");
			}
			this.loading = false;
		});
	}

	ngOnInit() {
		if (this.logic.getCompanyRegistrationNumber() === null) {
			this.businessDetailsForm = this.formBuilder.group({
				businessName: [this.logic.getBusinessName(), Validators.required],
				emailAddress: ['', Validators.required],
				phoneNumber: ['', Validators.required],
				websiteUrl: ['', Validators.required],
				businessDescription: ['', Validators.required],
				businessAddress: ['', Validators.required],
				businessType: ['', Validators.required],
				businessNumber: ['', Validators.required]
			});
		} else {
			this.businessDetailsForm = this.formBuilder.group({
				businessName: [this.logic.getBusinessName(), Validators.required],
				emailAddress: [this.logic.getEmailAddress(), Validators.required],
				phoneNumber: [this.logic.getBusinessPhoneNumber(), Validators.required],
				websiteUrl: ['http://do.com', Validators.required],
				businessDescription: [this.logic.getBusinessDescription(), Validators.required],
				businessAddress: [this.logic.getBusinessAddress(), Validators.required],
				businessType: [this.logic.getPackageId, Validators.required],
				businessNumber: [this.logic.getCompanyRegistrationNumber(), Validators.required]
			});
		}
	}
}
//emailAddress: ["", [Validators.required, ValidationHelper.emailValidator]],