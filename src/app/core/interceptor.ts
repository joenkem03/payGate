import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { throwError } from "rxjs";
import { catchError, map } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { LogicReuseable } from "../core/logic.reuseable";

@Injectable({
	providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {
	errorMessage: string;

	constructor(private router: Router, private toastr: ToastrService, private logic: LogicReuseable) { }

	handleError(error: HttpErrorResponse){
		console.log(error);
		return throwError(error);
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('event--->>>', event);
                    // this.errorDialogService.openDialog(event);
                }
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					this.router.navigate(["login"]);
				}
                // let data = {};
                // data = {
                //     message: error && error.error && error.error.Message ? error.error.Message : '',
                //     status: error.status
				// };
				this.errorMessage = error.error.Message;
				if (this.errorMessage) {
					this.logic.getErrorNotification(this.errorMessage);
				}
                return throwError(error);
			}
		));
	}
}