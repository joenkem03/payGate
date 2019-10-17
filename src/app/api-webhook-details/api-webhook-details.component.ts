import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ApiService } from "../core/api.service";
import { ToastrService } from "ngx-toastr";
import { LogicReuseable } from '../core/logic.reuseable';

@Component({
	selector: 'app-api-webhook-details',
  	templateUrl: './api-webhook-details.component.html',
  	styleUrls: ['./api-webhook-details.component.css']
})

export class ApiWebhookDetailsComponent implements OnInit {
	webhookDetailsForm: FormGroup;
	apikeysDetailsForm: FormGroup;
	invalidEntry: boolean = false;
	errorMessage: string;
	successMessage: string;
	loading: boolean;
	apiCategory: string;
	apiKeyCategory: string;
	authKeyCategory: string;
	apiKeyMessage: string;
	authKeyMessage: string;

	constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService, private toastr: ToastrService, private logic: LogicReuseable) {
		if (this.logic.getIsLive() == false) {
			this.apiCategory = "Demo";
			this.apiKeyCategory = "Demo API Key";
			this.authKeyCategory = "Demo Authentication Key";
			this.apiKeyMessage = "The Demo API key can only be used for test transactions and should not be exposed. Your Live Key will be provided as soon as you activate your account and switch to live";
			this.authKeyMessage = "The Demo Authentication key can only be used for test transactions and should not be exposed. Your Live Key will be provided as soon as you activate your account and switch to live";
		} else {
			this.apiCategory = "Live";
			this.apiKeyCategory = "Live API Key";
			this.authKeyCategory = "Live Authentication Key";
			this.apiKeyMessage = "The Live API key can only be used for live transactions. Please do not expose it. We will disable it if for any reason you switch back to demo";
			this.authKeyMessage = "The Live authentication key can only be used for live transactions. Please do not expose it. We will disable it if for any reason you switch back to demo";
		}
	}

	onCopyApiKey(userinput: any) {
		if (this.logic.copyInputMessage(userinput) == true) {
			this.logic.getSuccessNotification(this.apiKeyCategory + " successfully copied to clipboard");
		} else {
			this.logic.getSuccessNotification("Error copying " + this.apiKeyCategory + " to clipboard");
		}
	}

	onCopyAuthKey(userinput: any) {
		if (this.logic.copyInputMessage(userinput) == true) {
			this.logic.getSuccessNotification(this.authKeyCategory + " successfully copied to clipboard");
		} else {
			this.logic.getSuccessNotification("Error copying " + this.authKeyCategory + " to clipboard");
		}
	}

	onSubmitWebhook() {
		this.loading = true;
		if (this.webhookDetailsForm.invalid) {
			return;
		}

		const webhookDetailsPayload = {
			"SuccessURL": this.webhookDetailsForm.controls.successURL.value,
			"FailureURL": this.webhookDetailsForm.controls.failureURL.value 
		}
		
		let Form = JSON.stringify(webhookDetailsPayload);
		this.apiService.updateWebhookDetails(Form).subscribe(data => {
			// debugger;
			if (data.status == "true") {
				this.logic.getMerchantUserDetails();
				this.logic.getSuccessNotification(data.message);
			} else {
				this.invalidEntry = true;
				this.logic.getErrorNotification("Operation not completed. Something went wrong. Check and retry");
			}
			this.loading = false;
		});
	}

	ngOnInit() {
		if (this.logic.getSuccessWebhook() === null) {
			this.webhookDetailsForm = this.formBuilder.group({
				successURL: ['', Validators.required],
				failureURL: ['', Validators.required]
			});
		} else {
			this.webhookDetailsForm = this.formBuilder.group({
				successURL: [this.logic.getSuccessWebhook(), Validators.required],
				failureURL: [this.logic.getFailureWebhook(), Validators.required]
			});
		}

		if (this.logic.getIsLive() == false) {
			this.apikeysDetailsForm = this.formBuilder.group({
				apiKey: [this.logic.getDemoApiKey(), Validators.required],
				authKey: [this.logic.getDemoAuthKey(), Validators.required]
			});
		} else {
			this.apikeysDetailsForm = this.formBuilder.group({
				apiKey: [this.logic.getLiveApiKey(), Validators.required],
				authKey: [this.logic.getLiveAuthKey(), Validators.required]
			});
		}
	}
}
