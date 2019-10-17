import { Component, OnInit } from '@angular/core';
import { LogicReuseable } from '../core/logic.reuseable';

@Component({
	selector: 'app-getting-started',
	templateUrl: './getting-started.component.html',
	styleUrls: ['./getting-started.component.css']
})
export class GettingStartedComponent implements OnInit {
	firstname: string;
	fullname: string;

	constructor(private logic: LogicReuseable) {
		this.firstname = this.logic.getFirstName();
		this.fullname = this.logic.getFullName();
		// console.log(window.localStorage.getItem("accessToken"));
	}

	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('2-column');
	}

}
