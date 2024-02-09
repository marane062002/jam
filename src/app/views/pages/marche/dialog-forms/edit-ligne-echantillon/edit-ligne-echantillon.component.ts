import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: "kt-edit-ligne-echantillon",
	templateUrl: "./edit-ligne-echantillon.component.html",
	styleUrls: ["./edit-ligne-echantillon.component.scss"],
})
export class EditLigneEchantillonComponent implements OnInit {
	// ================================================================
	//
	// ================================================================
	constructor(
		public dialogRef: MatDialogRef<EditLigneEchantillonComponent>,
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
	ngOnInit() {}
	// ================================================================
	//
	// ================================================================
}
