import { Architecte } from "./../models/architecte";
import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { LangChangeEvent, TranslateService } from "@ngx-translate/core";
import { read } from "fs";
import { ArchitecteService } from "../../shared/architecte.service";

@Component({
	selector: "kt-edit-architect-infi",
	templateUrl: "./edit-architect-infi.component.html",
	styleUrls: ["./edit-architect-infi.component.scss"],
})
export class EditArchitectInfiComponent implements OnInit {
	architecte: Architecte;
	architecteEdite: Architecte;
	architecteForm: any;
	noteTotale = 0;
	checkLang: string;
	constructor(
		private serviceArchitecte: ArchitecteService,
		private translate: TranslateService,

		public dialogRef: MatDialogRef<EditArchitectInfiComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {
		this.architecte = formData.architecte;
	}

	ngOnInit() {
		console.log(this.architecte);
		this.architecteEdite = {
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
		this.checkLang = window.localStorage.getItem("language");
		console.log(this.checkLang);
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == "ar") {
				this.checkLang = "ar";
			} else if (event.lang == "fr") {
				this.checkLang = "fr";
			}
		});

		console.log(this.formData.architecte);
		this.architecteForm = {
			id: null,
			nom: this.architecte.nom,
			prenom: this.architecte.prenom,
			mail: this.architecte.mail,
			adresse: this.architecte.adresse,
			montant: this.architecte.montant,
			nt: null,
			nf: null,
			ne: null,
			noteTotale: null,
			consultationArchitecturale: {
				id: null,
			},
		};
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
	edite() {
		this.architecteEdite = {
			id: this.architecte.id,
			nom: this.architecteForm.nom,
			prenom: this.architecteForm.prenom,
			mail: this.architecteForm.mail,
			adresse: this.architecteForm.adresse,
			montant: this.architecteForm.montant,
			nt: this.architecte.nt,
			nf: this.architecte.nf,
			ne: this.architecte.ne,
			noteTotale: this.architecte.noteTotale,
			consultationArchitecturale: {
				id: this.formData.id,
			},
		};
		this.serviceArchitecte
			.editArchitecte(this.architecteEdite)
			.subscribe((res) => {
				this.onNoClick();
			});
	}
}
