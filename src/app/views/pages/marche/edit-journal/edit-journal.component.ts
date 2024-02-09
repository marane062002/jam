import { Journaux } from "./../models/journaux";
import { JournauxService } from "./../../shared/journaux.service";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";

@Component({
	selector: "kt-edit-journal",
	templateUrl: "./edit-journal.component.html",
	styleUrls: ["./edit-journal.component.scss"],
})
export class EditJournalComponent implements OnInit {
	journale: Journaux;
	typeJournal: string;
	journaleEdit: Journaux;
	architecteForm: any;
	noteTotale = 0;
	journaleForm: any;
	checkLang: string;
	constructor(
		private translate: TranslateService,
		private serviceJournale: JournauxService,
		public dialogRef: MatDialogRef<EditJournalComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {
		this.journale = this.formData.journale;
		this.typeJournal = this.formData.typeJournal;
	}

	ngOnInit() {
		this.journaleEdit = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			consultationArchitecturale: null,
			ao: null
		};
		this.checkLang = window.localStorage.getItem("language");
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});
		this.journaleForm = {
			nomAr: this.journale.nomAr,
			nomFr: this.journale.nomFr,
			adresse: this.journale.adresse,
			date: this.formatDate(this.journale.date),
		};
		
	}
	onNoClick(): void {
		this.formData.journale = {
			id: null,
			nomAr: "",
			nomFr: "",
			adresse: "",
			date: null,
			consultationArchitecturale: null,
			ao: null
		};
		(this.formData.id = null), this.dialogRef.close();
	}

	edite() {
		if(this.typeJournal == "ao"){
			this.journaleEdit = {
				id: this.journale.id,
				nomAr: this.journaleForm.nomAr,
				nomFr: this.journaleForm.nomFr,
				adresse: this.journaleForm.adresse,
				date: this.journaleForm.date,
				ao: {
					id: this.formData.id,
				},
			};
		}else{
			this.journaleEdit = {
				id: this.journale.id,
				nomAr: this.journaleForm.nomAr,
				nomFr: this.journaleForm.nomFr,
				adresse: this.journaleForm.adresse,
				date: this.journaleForm.date,
				consultationArchitecturale: {
					id: this.formData.id,
				}
			};
		}
		
		console.log(this.journaleEdit);
		this.serviceJournale.editJuurnal(this.journaleEdit).subscribe((res) => {
			this.onNoClick();
		});
	}

	formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}
}
