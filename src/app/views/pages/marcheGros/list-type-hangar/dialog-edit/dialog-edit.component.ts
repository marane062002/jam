import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Hangar } from '../../../../../core/_base/layout/models/Hangar';
import { DialogEditCategorieComponent } from '../../list-categorie-produit/dialog-edit-categorie/dialog-edit-categorie.component';
import { HangarService } from '../../Service/hangar.service';



@Component({
	selector: 'kt-dialog-edit',
	templateUrl: './dialog-edit.component.html',
	styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnInit {
	hangar: Hangar
	loading: boolean = false
	hangarForm = new FormGroup({
		numHangar: new FormControl('', [Validators.required]),
		lib: new FormControl('', [Validators.required]),
		description: new FormControl('', [Validators.required])


	});
	isSelected: boolean = false
	constructor(public dialogRef: MatDialogRef<DialogEditCategorieComponent>, private router: Router, private hangarService: HangarService, @Inject(MAT_DIALOG_DATA) public data: any) { }

	ngOnInit() {
		console.log('edit', this.data.id)
		if (this.data.id) {
			this.hangarService.getById(this.data.id).subscribe((res) => {
				console.log(res);
				this.hangarForm.patchValue({ ...res.body })

			})
		}
	}

	resetForm() {
		this.loading = false;
		this.hangarForm.reset();
		this.dialogRef.close();
	}

	onSubmit() {
		console.log("form====>", this.hangarForm.value);
		let categori = {
			id: this.data.id,
			numHangar: this.hangarForm.get("numHangar").value,
			lib: this.hangarForm.get("lib").value,
			description: this.hangarForm.get("description").value
		}
		this.hangarService.update(categori)
			.subscribe(data => console.log(data), error => console.log(error));
		this.dialogRef.close();
		location.reload()

	}





}




