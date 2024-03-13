import { Component, OnInit, Inject } from '@angular/core';
import { AoService } from '../../../shared/ao.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	selector: 'kt-lettre-maintien-dialog',
	templateUrl: './lettre-maintien-dialog.component.html',
	styleUrls: ['./lettre-maintien-dialog.component.scss']
})
export class LettreMaintienDialogComponent implements OnInit {
	prestataires: any[] = [];
	constructor(private service: AoService, public dialogRef: MatDialogRef<LettreMaintienDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public formData: any) { }

	ngOnInit() {
		this.getPrestataires();
	}

	async getPrestataires() {
		await this.service
			.getAllOffreDeposee(this.formData.ao, 0, 5)
			.subscribe(
				(data) => {

					for (let i = 0; i < data.length; i++) {
						this.prestataires.push(data[i].prestataire);
					}
					console.log("Prestataire : " + JSON.stringify(this.prestataires, null, 2));
				},
				(err) => {
					console.log(err);
				}
			);
	}
	// ================================================================
	//
	// ================================================================
	onNoClick(): void {
		this.dialogRef.close();
	}
}
