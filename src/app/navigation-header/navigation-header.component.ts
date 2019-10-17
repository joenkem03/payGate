import { Component, OnInit } from '@angular/core';
import { LogicReuseable } from "../core/logic.reuseable";

@Component({
	selector: 'app-navigation-header',
	templateUrl: './navigation-header.component.html',
	styleUrls: ['./navigation-header.component.css']
})

export class NavigationHeaderComponent implements OnInit {
	fullname: string;

	constructor( private logic: LogicReuseable ) {
		this.fullname = this.logic.getFullName();
	}

	onLogout() {
		this.logic.Logout();
	}

	ngOnInit() {
		if (window.localStorage.getItem('accessToken') === null) {
			this.logic.Logout();
		}
	}
}
