import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../core/api.service";
import { ToastrService } from "ngx-toastr";
import { LogicReuseable } from '../core/logic.reuseable';

@Component({
	selector: 'app-bank-details',
	templateUrl: './bank-details.component.html',
	styleUrls: ['./bank-details.component.css']
})

export class BankDetailsComponent implements OnInit {
	bankDetailsForm: FormGroup;
	invalidEntry: boolean = false;
	errorMessage: string;
	successMessage: string;
	loading: boolean;

	constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private toastr: ToastrService, private logic: LogicReuseable) {}

	onSubmit() {
		this.loading = true;
		if (this.bankDetailsForm.invalid) {
			return;
		}

		const bankDetailsPayload = {
			"Accountnumber": this.bankDetailsForm.controls.accountNumber.value,
			"Accountname": "Dimgba Dimgba Kalu", // this.bankDetailsForm.controls.accountName.value 
			"Bankname": this.bankDetailsForm.controls.bankName.value,
			"BVN": this.bankDetailsForm.controls.merchantBVN.value
			// "SortCode": "034"
		}
		
		console.log(bankDetailsPayload);
		let Form = JSON.stringify(bankDetailsPayload);
		this.apiService.addBankDetails(Form).subscribe(data => {
			// debugger;
			if (data.status == "true") {
				// this.logic.getMerchantUserDetails();
				this.logic.getSuccessNotification(data.message);
			} else {
				this.invalidEntry = true;
				this.logic.getErrorNotification("Operation not completed. Something went wrong. Check and retry");
			}
			this.loading = false;
		});
	}

	ngOnInit() {
		// if (this.logic.getBankAccountNumber() === null) {
		// 	this.bankDetailsForm = this.formBuilder.group({
		// 		Bankname: ['', Validators.required],
		// 		Accountnumber: ['', Validators.required],
		// 		BVN: ['', Validators.required]
		// 	});
		// } else {
		// 	this.bankDetailsForm = this.formBuilder.group({
		// 		bankName: [this.logic.getBankName(), Validators.required],
		// 		accountNumber: [this.logic.getBankAccountNumber(), Validators.required]
		// 	});
		// }
		this.bankDetailsForm = this.formBuilder.group({
			bankName: ['', Validators.required],
			accountNumber: ['', Validators.required],
			merchantBVN: ['', Validators.required]
		});
	}
}