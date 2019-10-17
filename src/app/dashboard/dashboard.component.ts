import { Component, OnInit } from '@angular/core';
import { LogicReuseable } from "../core/logic.reuseable";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	fullname: string;

	constructor(private logic: LogicReuseable) { 
		this.fullname = this.logic.getFullName();
	}
	
	ngOnInit() {
		const body = document.getElementsByTagName('body')[0];
		body.classList.add('2-column');
	}
}
