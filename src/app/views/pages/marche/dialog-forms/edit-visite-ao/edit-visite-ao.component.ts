import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrganisationService } from "../../../organisation/organisation.service";
import { PersonnelService } from "../../../rh/services/personnel.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DatePipe } from '@angular/common'

@Component({
	selector: "kt-edit-visite-ao",
	templateUrl: "./edit-visite-ao.component.html",
	styleUrls: ["./edit-visite-ao.component.scss"],
})
export class EditVisiteAoComponent implements OnInit {
	// ================================================================
	//
	// ================================================================
	divisions;
	services;
	personnels;
	checkLang: string;
	heureVisite = { hour: 10, minute: 10 };
	// ================================================================
	//
	// ================================================================
	constructor(
		public datepipe: DatePipe,
		private serviceOrg: OrganisationService,
		private serviceRH: PersonnelService,
		private translate: TranslateService,
		public dialogRef: MatDialogRef<EditVisiteAoComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {}
	// ================================================================
	//
	// ================================================================
	onNoClick(): void {
		this.dialogRef.close();
	}
	// ================================================================
	//
	// ================================================================
	dateHeureVisite(){
		// var dt = new Date(this.formData.dateVisite);
		// this.formData.dateVisite = new Date(
		// 	dt.getFullYear() +
		// 	"/" +
		// 	(dt.getMonth() + 1) +
		// 	"/" +
		// 	dt.getDate() +
		// 	" " +
		// 	this.heureVisite.hour +
		// 	":" +
		// 	this.heureVisite.minute
		// );
	}

	onDatePublicationChange(){
		let dateNow = new Date();
		let datePublication = new Date(this.formData.datePublication);
		let days: number = (datePublication.getTime() - dateNow.getTime())*2/3;
		let dateVisite = new Date(dateNow.getTime() + days);		
	//	this.formData.dateVisite =this.datepipe.transform(dateVisite, 'dd/MM/yyyy');
	//	this.formData.heureVisite = { hour: this.heureVisite.hour, minute: this.heureVisite.minute }
	}
	// ================================================================
	//
	// ================================================================
	TimeOnChange(newTime) {
		this.formData.heureVisite = { hour: this.heureVisite.hour, minute: this.heureVisite.minute }
		// console.log('Time changed', newTime);
		// var dt = new Date(this.formData.dateVisite);
		// this.formData.dateVisite = new Date(
		// 	dt.getFullYear() +
		// 	"/" +
		// 	(dt.getMonth() + 1) +
		// 	"/" +
		// 	dt.getDate() +
		// 	" " +
		// 	this.heureVisite.hour +
		// 	":" +
		// 	this.heureVisite.minute
		// );
		// console.log('Date time visite changed', this.formData.dateVisite);
		
	  }
	// ================================================================
	//
	// ================================================================
	ngOnInit() {
		this.getDivisions();
		this.checkLang = window.localStorage.getItem("language");
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});

		if (this.formData.dateVisite != null) {
			var m = new Date(this.formData.dateVisite);
			this.heureVisite = { hour: m.getHours(), minute: m.getMinutes() }
		}
		//this.getServices();
		//this.getPersonnels();
		/*
		this._model.valueChanges.subscribe((event) => {
			this._valueInDirective = event;
			console.log("Division : "+ this.formData.division);
			console.log("Event : "+ this._valueInDirective);
		});
		*/
	}

	onChange(newValue) {

	}
	// ================================================================
	//
	// ================================================================
	getDivisions() {
		this.serviceOrg
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	/*
	getServices() {
		this.serviceOrg
			.getRessource("/services/index")
			.subscribe((data) => (this.services = data));
	}
	getPersonnels() {
		this.serviceRH.getRessource().then(data => this.personnels = data);
	}
	*/
	// ================================================================
	//
	// ================================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
		if (idDivision != 0) {
			this.serviceRH
				.getRessourceById(idDivision, "/personnels/division/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
			this.serviceOrg
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
		}
	}
	// ================================================================
	//
	// ================================================================
	onChangeService(f) {
		const idService = f.value;
		if (idService != 0) {
			this.serviceRH
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		}
	}
}
