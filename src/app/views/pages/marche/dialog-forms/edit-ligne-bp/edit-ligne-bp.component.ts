import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: "kt-edit-ligne-bp",
	templateUrl: "./edit-ligne-bp.component.html",
	styleUrls: ["./edit-ligne-bp.component.scss"],
})
export class EditLigneBpComponent implements OnInit {
	constructor(
		public dialogRef: MatDialogRef<EditLigneBpComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any
	) {}
	EnableQte:boolean = true;
	unites = [
		{ id: 1, libelle: "Forfaitaire" },
		{ id: 2, libelle: "Numérique" },
	];
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit() {
	console.log(this.formData )
		// if (this.formData.unite.id == 2) {
		// 	this.EnableQte = false;
		// } else {
		// 	this.EnableQte = true;
		// }
	}

	onChangeofOptionsUnite($event) {
		console.log($event);
		if ($event.value == 2) {
			//document.getElementById("qte").style.display = "inline";
			this.EnableQte = false;
		} else {
			this.formData.quantite = 1;
			this.EnableQte = true;
			//document.getElementById("qte").style.display = "none";
		}
	}
	onChangeofQte($event) {
		console.log(event);
	}
}
