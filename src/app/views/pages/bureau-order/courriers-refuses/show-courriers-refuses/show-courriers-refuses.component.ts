import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';

@Component({
  selector: 'kt-show-courriers-refuses',
  templateUrl: './show-courriers-refuses.component.html',
  styleUrls: ['./show-courriers-refuses.component.scss']
})
export class ShowCourriersRefusesComponent implements OnInit {

	// =================================================================
	// declaration des Attributs
	// =================================================================
	loading = false;
	btnloading = false;
	detailscourrier;
	pjs;
	_data;
	data_size: number;
	editForm: FormGroup;
	validate:number;
	// file varriable
	files : Observable<any>;
	start:boolean=true;
	isFile:boolean=false;
	// =================================================================
	// Constructeur
	// =================================================================
	constructor(
		private service: BoServiceService,
		private router: Router,
		private location: Location,
	) {
		// get all files by id courrier
		let courrierId = window.localStorage.getItem("csId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortants"]);
			return;
		}
		setTimeout(() => {
			if (courrierId!=null)
				this.files = this.service.getByIdCourrierFiles2(courrierId);
			this.start = false;
		}, 1000);
	}
	// ============================================================
	// get file name
	// ============================================================
	FileName(file){
		return this.service.getFileName(file);
	}
	// ============================================================
	// get file extension & icons
	// ============================================================
	FileExtension(file){
		return this.service.getExtensionFile(file);
	}
	// ====================================
	//
	//=====================================
	ngOnInit() {
		let courrierId = window.localStorage.getItem("csId");
		if (!courrierId) {
			alert("Invalid action.");
			this.router.navigate(["list-courriers-sortants"]);
			return;
		}
		const _this = this;
		this.service
			.getObjectById("/courrierSortants/show/", +courrierId)
			.subscribe(
				(data) => {
					if(data.statut.length > 10){
						_this.validate = 1;
					}else{
						_this.validate = 0;
					}
					this.detailscourrier = data;
				},
				(error) => console.log(error)
			);
			//console.log('======= ' + courrierId);
		// if (courrierId!=null)
		// 	this.service.getByIdCourrierFiles2(courrierId).subscribe((m) => {
		// 		this.pjs = m;
		// 		//console.log("file log :" + this.pjs.id);
		// 	});
	}
	// ====================================
	//
	//=====================================
	onClickPjName(e, id) {
		console.log("You clicked: " + e);
		var r = e.substring(0,e.length-4);
		console.log("id file: " + r);
		window.open(environment.API_ALFRESCO_URL + "/PjCourriersSortants/"+r);
	}
	// ====================================
	//
	//=====================================
	back() {
		this.location.back();
	}
}
