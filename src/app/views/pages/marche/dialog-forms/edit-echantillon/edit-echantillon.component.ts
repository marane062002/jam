import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { OrganisationService } from "../../../organisation/organisation.service";
import { PersonnelService } from "../../../rh/services/personnel.service";

@Component({
	selector: "kt-edit-echantillon",
	templateUrl: "./edit-echantillon.component.html",
	styleUrls: ["./edit-echantillon.component.scss"],
})
export class EditEchantillonComponent implements OnInit {
	heureExam = { hour: 10, minute: 10 };
	// ================================================================
	//
	// ================================================================
	divisions;
	services;
	personnels;
	// ================================================================
	//
	// ================================================================
	constructor(
		private serviceOrga: OrganisationService,
		private serviceRH: PersonnelService,
		public dialogRef: MatDialogRef<EditEchantillonComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {}
	// ================================================================
	//
	// ================================================================
	ngOnInit() {
		this.getDivisions();
		const idDivision = this.formData.division;
		const idService = this.formData.service;
		if (idDivision != 0 && idService != 0) {
			this.serviceOrga
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
			this.serviceRH
				.getRessourceById(idService, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		} else if (idDivision != 0 && idService == 0) {
			this.serviceRH
				.getRessourceById(idDivision, "/personnels/service/")
				.then(
					(data) => {
						this.personnels = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
			this.personnels = null;
			this.divisions = null;
		}
	}
	// ================================================================
	//
	// ================================================================
	onNoClick(): void {
		this.dialogRef.close();
	}
	// ========================================================================
	//
	// ========================================================================
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
			this.serviceOrga
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
	// ========================================================================
	//
	// ========================================================================
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
	// ========================================================================
	//
	// ========================================================================
	getDivisions() {
		this.serviceOrga
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}

		// ================================================================
	//
	// ================================================================
	dateHeureVisite(){
		var dt = new Date(this.formData.dateExamen);
		this.formData.dateExamen = new Date(
			dt.getFullYear() +
			"/" +
			(dt.getMonth() + 1) +
			"/" +
			dt.getDate() +
			" " +
			this.heureExam.hour +
			":" +
			this.heureExam.minute
		);
	}
	// ================================================================
	//
	// ================================================================
	TimeOnChange(newTime) {
		console.log('Time changed', newTime);
		var dt = new Date(this.formData.dateExamen);
		this.formData.dateExamen = new Date(
			dt.getFullYear() +
			"/" +
			(dt.getMonth() + 1) +
			"/" +
			dt.getDate() +
			" " +
			this.heureExam.hour +
			":" +
			this.heureExam.minute
		);
	  }
}
