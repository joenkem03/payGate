import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { ApiService } from "../core/api.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({
    providedIn: 'root'
})

export class LogicReuseable {
	merchantDetails = JSON.parse(window.localStorage.getItem("merchantDetails"));
	firstname: string;
	fullname: string;
	lastname: string;
	phonenumber: string;
	emailaddress: string;
	businessname: string;

	constructor(private http: HttpClient, private router: Router, private apiService: ApiService, private toastr: ToastrService) {
		console.log(JSON.parse(window.localStorage.getItem("merchantDetails")));
	}
	
	Logout() {
		window.localStorage.removeItem("accessToken");
		window.localStorage.removeItem("merchantDetails");
		window.localStorage.removeItem("username");
		if (window.localStorage.getItem('accessToken') === null) {
			console.log("Logged out!");
			this.router.navigate(['login']);
		} 
	}

	/* To copy Text from Textbox */
	copyInputMessage(inputElement){
		inputElement.select();
		if (document.execCommand('copy') == true) {
			inputElement.setSelectionRange(0, 0);
			return true;
		} else {
			return false;
		}
	}
	
	/* To copy any Text */
	copyText(val: string){
		let selBox = document.createElement('textarea');
		selBox.style.position = 'fixed';
		selBox.style.left = '0';
		selBox.style.top = '0';
		selBox.style.opacity = '0';
		selBox.value = val;
		document.body.appendChild(selBox);
		selBox.focus();
		selBox.select();
		document.execCommand('copy');
		document.body.removeChild(selBox);
	}

	getSuccessNotification(successMessage: string) {  
		this.toastr.success(successMessage, 'Success')  
	}  
	
	getErrorNotification(errorMessage: string) {  
		this.toastr.error(errorMessage, 'Error')   
	} 

	getMerchantUserDetails() {
		// load the merchant data here
		const merchantDetailsPayload = {}
		let Form = JSON.stringify(merchantDetailsPayload);
		this.apiService.getMerchantUserDetails(Form).subscribe(merchant_data => {
			// debugger;
			const res: any = JSON.stringify(merchant_data);
			console.log(res);
			window.localStorage.setItem("merchantDetails", res);
		});
	}

	getMerchantUserRegistrationStatus() {
		// load the merchant data here
		const merchantDetailsPayload = {}
		let Form = JSON.stringify(merchantDetailsPayload);
		this.apiService.getMerchantUserRegistrationStatus(Form).subscribe(merchant_data => {
			// debugger;
			const res: any = JSON.stringify(merchant_data);
			console.log(res);
			// window.localStorage.setItem("merchantDetails", res);
		});
	}

	getFirstName() {
		if (this.merchantDetails !== null) {
			if (this.merchantDetails[0].FirstName == null) {
				return this.getEmailAddress().substring(0, this.getEmailAddress().lastIndexOf("@"));
			} else {
				return this.merchantDetails[0].FirstName;
			}
		}
	}

	getLastName() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].LastName;
		}
	}

	getFullName() {
		if (this.getLastName() == null) {
			return this.getFirstName();
		} else { 
			return this.getFirstName() + ' ' + this.getLastName();
		}
	}

	getPhoneNumber() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].PhoneNumber;
		}
	}

	getEmailAddress() {
		if (this.merchantDetails !== null) {
			return window.localStorage.getItem("username");
		}
	}

	getBusinessName() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BusinessName;
		}
	}

	getIsLive() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].IsLive;
		}
	}

	getBVN() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BVN;
		}
	}

	getBusinessPhoneNumber() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BussinessPhoneNumber;
		}
	}
	
	getBusinessDescription() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BussinessDescription;
		}
	}

	getBusinessAddress() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BussinessAddress;
		}
	}

	getPackageId() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].PackageId;
		}
	}

	getPackage() {
		if (this.merchantDetails !== null) {
			if (this.getPackageId() == 1) {
				return "Starter";
			}
			if (this.getPackageId() == 2) {
				return "Enterprise";
			}
		}
	}

	getCompanyRegistrationNumber() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].CompanyRegistrationNumber;
		}
	}

	getBankAccountNumber() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BankAccountNumber;
		}
	}

	getBankName() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].BankName;
		}
	}

	getSortCode() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].SortCode;
		}
	}

	getAccountName() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].AccountName;
		}
	}

	getDateOfBirth() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].DateOfBirth;
		}
	}

	getSuccessWebhook() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].SuccessWebhook;
		}
	}

	getFailureWebhook() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].FailureWebhook;
		}
	}

	getDemoApiKey() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].DemoApiKey;
		}
	}

	getDemoAuthKey() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].DemoAuthKey;
		}
	}

	getLiveApiKey() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].LiveApiKey;
		}
	}

	getLiveAuthKey() {
		if (this.merchantDetails !== null) {
			return this.merchantDetails[0].LiveAuthKey;
		}
	}
}
