import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { read } from "fs";
import { from } from "rxjs";
import { ArchitecteService } from "../../../shared/architecte.service";
import { VisiteCaService } from "../../../shared/visite-ca.service";
import { VisiteCa } from "../../models/visite-ca";
import { Architecte } from "./../../models/architecte";

@Component({
	selector: "kt-edit-architecte",
	templateUrl: "./edit-architecte.component.html",
	styleUrls: ["./edit-architecte.component.scss"],
})
export class EditArchitecteComponent implements OnInit {
	architecte: Architecte;
	validationFinanceForm: any;
	noteTotale = 0;
	accepte: boolean = false;
	rejete: boolean = false;
	visite: VisiteCa;
	valDatePlis: boolean;
	checkLang: string;
	constructor(
		private serviceArchitecte: ArchitecteService,
		private translate: TranslateService,
		private vistieCaService: VisiteCaService,
		public dialogRef: MatDialogRef<EditArchitecteComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {
		this.architecte = formData.architecte;
	}
	onNoClick(): void {
		this.architecte = {
			id: null,
			nom: "",
			prenom: "",
			mail: "",
			adresse: "",
			montant: null,
			nt: null,
			nf: null,
			ne: null,
			noteTotale: null,
			consultationArchitecturale: {
				id: null,
			},
		};
		this.dialogRef.close();
	}
	ngOnInit() {
		console.log(this.checkLang);
		this.checkLang = window.localStorage.getItem("language");
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				console.log("here arabe");
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				console.log("here francais");
				this.checkLang = "fr";
			}
		});

		console.log(this.formData.architecte);
		this.validationFinanceForm = {
			nt: null,
			nf: null,
			ne: null,
			motif: null,
		};
	}

	change(event: any) {
		if (event.value == 1) {
			this.accepte = true;
			this.rejete = false;
		} else {
			this.accepte = false;
			this.rejete = true;
		}
	}

	imprimerAvis(id: any) {}

	validerComissionFinance() {
		this.serviceArchitecte
			.validerComissionFinance(
				this.architecte.id,
				this.validationFinanceForm.nt,
				this.validationFinanceForm.nf,
				this.validationFinanceForm.ne
			)
			.subscribe((res) => {
				this.onNoClick();
			});
	}

	rejeter() {
		this.serviceArchitecte
			.motifDeRejet(this.architecte.id, this.validationFinanceForm.motif)
			.subscribe((res) => {
				this.onNoClick();
			});
	}
}
