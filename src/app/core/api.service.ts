import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from "../model/user.model";
import { Observable } from "rxjs/index";
import { ApiResponse } from "../model/api.response";
import { map } from 'rxjs/operators';
// import { LogicReuseable } from '../core/logic.reuseable';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
	private options = {headers: new HttpHeaders().set('Content-Type', 'application/json')};
	private baseUrl: string = 'http://gustapifront.ercas.ng/api/';
	// private merchantDetails = JSON.parse(window.localStorage.getItem("merchantDetails"));
	updateBusinessDetailsURL: string;
	updateBankDetailsURL: string;
	updateWebhookDetailsURL: string;

	constructor(private http: HttpClient) { }
	
	// registration call request: signup for new merchants
	signup(signupPayload: string): Observable<ApiResponse> {
		return this.http.post<ApiResponse>('http://gustapifront.ercas.ng/api/account/register', signupPayload, this.options);
	}

	// call request to login user
	login(username: string, password: string) {
		const params = new HttpParams({
			fromObject: {
				grant_type: 'password',
				username: username,
				password: password
			}
		});
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		};
		return this.http.post('http://gustapifront.ercas.ng/token', params, httpOptions).pipe(map(
			(res: any) => {
				return res;
				// console.log(res);
				// sessionStorage.setItem('access_token', res.access_token);
				// sessionStorage.setItem('refresh_token', res.refresh_token);
			},
			err => console.log(err)
		));
	}

	// sendEmailAndSms(emailPayload: string): Observable<ApiResponse> {
	// 	return this.http.post<ApiResponse>('http://69.64.74.108:8011/api/pos/Sms', emailPayload, this.options);
	// }

	// get all user details
	getMerchantUserDetails(merchantDetailsPayload: string): Observable<ApiResponse> {
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		};
		return this.http.post('http://gustapifront.ercas.ng/api/Info/All', merchantDetailsPayload, httpOptions).pipe(map(
			(res: any) => {
				console.log(res);
				return res;
			},
			err => console.log(err)
		));
	}

	updatePersonalDetails(personalDetailsPayload: string): Observable<ApiResponse> {
		// const merchantDetails = JSON.parse(window.localStorage.getItem("merchantDetails"));
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		};
		return this.http.post('http://gustapifront.ercas.ng/api/Update/PD', personalDetailsPayload, httpOptions).pipe(map(
			(res: any) => {
				res = {
                    message: "Updated successfully",
                    status: "true"
				};
				return res;
			},
			err => console.log(err)
		));
	}

	updateBusinessDetails(businessDetailsPayload: string): Observable<ApiResponse> {
		this.updateBusinessDetailsURL = "http://gustapifront.ercas.ng/api/Update/BNR";
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		};
		return this.http.post(this.updateBusinessDetailsURL, businessDetailsPayload, httpOptions).pipe(map(
			(res: any) => {
				res = {
                    message: "Updated successfully",
                    status: "true"
				};
				return res;
			},
			err => console.log(err)
		));
	}

	updateBankDetails(bankDetailsPayload: string): Observable<ApiResponse> {
		// const merchantDetails = JSON.parse(window.localStorage.getItem("merchantDetails"));
		this.updateBankDetailsURL = "http://gustapifront.ercas.ng/api/Update/ACI";
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		};
		return this.http.post(this.updateBankDetailsURL, bankDetailsPayload, httpOptions).pipe(map(
			(res: any) => {
				res = {
                    message: "Updated successfully",
                    status: "true"
				};
				return res;
			},
			(err: any) => console.log(err)
		));
	}

	updateWebhookDetails(webhookDetailsPayload: string): Observable<ApiResponse> {
		const merchantDetails = JSON.parse(window.localStorage.getItem("merchantDetails"));
		this.updateWebhookDetailsURL = "http://gustapifront.ercas.ng/api/Update/Webhook";
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + localStorage.getItem("accessToken")
			})
		};
		return this.http.post(this.updateWebhookDetailsURL, webhookDetailsPayload, httpOptions).pipe(map(
			(res: any) => {
				res = {
                    message: "Updated successfully",
                    status: "true"
				};
				return res;
			},
			(err: any) => console.log(err)
		));
	}


	getUsers(): Observable<ApiResponse> {
		return this.http.get<ApiResponse>(this.baseUrl);
	}

	getUserById(id: number): Observable<ApiResponse> {
		return this.http.get<ApiResponse>(this.baseUrl + id);
	}

	createUser(user: User): Observable<ApiResponse> {
		return this.http.post<ApiResponse>(this.baseUrl, user);
	}

	updateUser(user: User): Observable<ApiResponse> {
		return this.http.put<ApiResponse>(this.baseUrl + user.id, user);
	}

	deleteUser(id: number): Observable<ApiResponse> {
		return this.http.delete<ApiResponse>(this.baseUrl + id);
	}
}
