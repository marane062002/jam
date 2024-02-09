import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { EditVisiteAoComponent } from "./../dialog-forms/edit-visite-ao/edit-visite-ao.component";
import { Component, OnInit, Inject } from "@angular/core";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { OrganisationService } from "../../organisation/organisation.service";
import { PersonnelService } from "../../rh/services/personnel.service";

@Component({
	selector: "kt-edit-visite-ca",
	templateUrl: "./edit-visite-ca.component.html",
	styleUrls: ["./edit-visite-ca.component.scss"],
})
export class EditVisiteCaComponent implements OnInit {
	divisions;
	services;
	personnels;
	checkLang: string;
	heureVisite = { hour: 10, minute: 10 };
	heureVisite2 = { hour: 10, minute: 10 };

	constructor(
		private serviceOrg: OrganisationService,
		private serviceRH: PersonnelService,
		private translate: TranslateService,
		public dialogRef: MatDialogRef<EditVisiteAoComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	ngOnInit() {
		this.getDivisions();
		this.checkLang = window.localStorage.getItem("language");
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});

		if (this.formData.dateOuvertureDesPlis != null) {
			var m = new Date(this.formData.dateOuvertureDesPlis);
			this.heureVisite = { hour: m.getHours(), minute: m.getMinutes() };
		}
		if (this.formData.dateVisite != null) {
			var m = new Date(this.formData.dateVisite);
			this.heureVisite2 = { hour: m.getHours(), minute: m.getMinutes() };
		}
	}
	getDivisions() {
		this.serviceOrg
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	dateHeureVisite() {
		var dt = new Date(this.formData.dateOuvertureDesPlis);
		this.formData.dateOuvertureDesPlis = new Date(
			dt.getFullYear() +
				"/" +
				(dt.getMonth() + 1) +
				"/" +
				dt.getDate() +
				" " +
				this.heureVisite.hour +
				":" +
				this.heureVisite.minute
		);
	}
	dateHeureVisite2() {
		var dt = new Date(this.formData.dateVisite);
		this.formData.dateVisite = new Date(
			dt.getFullYear() +
				"/" +
				(dt.getMonth() + 1) +
				"/" +
				dt.getDate() +
				" " +
				this.heureVisite2.hour +
				":" +
				this.heureVisite2.minute
		);
	}

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

	TimeOnChange(newTime) {
		var dt = new Date(this.formData.dateVisite);
		this.formData.dateVisite = new Date(
			dt.getFullYear() +
				"/" +
				(dt.getMonth() + 1) +
				"/" +
				dt.getDate() +
				" " +
				this.heureVisite.hour +
				":" +
				this.heureVisite.minute
		);
	}

	TimeOnChange2(newTime) {
		var dt = new Date(this.formData.dateOuvertureDesPlis);
		this.formData.dateOuvertureDesPlis = new Date(
			dt.getFullYear() +
				"/" +
				(dt.getMonth() + 1) +
				"/" +
				dt.getDate() +
				" " +
				this.heureVisite2.hour +
				":" +
				this.heureVisite2.minute
		);
	}

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
