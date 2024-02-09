import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';

@Component({
	selector: 'kt-edit-courriers-convocations',
	templateUrl: './edit-courriers-convocations.component.html',
	styleUrls: ['./edit-courriers-convocations.component.scss']
})
export class EditCourriersConvocationsComponent implements OnInit {
	language=localStorage.getItem('language');
	loading:any;
	editForm: FormGroup;
	// tabMembresCommission = [];
	courrier_conv_id: any;


	constructor(private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private bureauOrdreService: BoServiceService) {
	}

	formatDate(datetime: string): string {
		const date = new Date(datetime);
		const year = date.getFullYear();
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const day = date.getDate().toString().padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	ngOnInit() {
		this.editForm = this.formBuilder.group({
			date: [null],
			heure: [null],
			lieu: [null],
			// membresCommission: [null],
			delai: [null],
			nomCommission: [null],
			ordreJour: [null],
			responsableDispatching: [null],
			id: [],
			statut: [null],
		});
		this.courrier_conv_id = parseInt(window.localStorage.getItem('courrier_conv_id'));
		this.bureauOrdreService
			.getObjectById("/courrierConvocation/show/", +this.courrier_conv_id)
			.subscribe(data => {
				// this.tabMembresCommission = data.membresCommission;
				this.editForm.controls['date'].patchValue(this.formatDate(data.date));
				this.editForm.controls['heure'].patchValue(data.heure);
				this.editForm.controls['lieu'].patchValue(data.lieu);
				this.editForm.controls['delai'].patchValue(data.delai);
				this.editForm.controls['nomCommission'].patchValue(data.nomCommission);
				this.editForm.controls['ordreJour'].patchValue(data.ordreJour);
				this.editForm.controls['id'].patchValue(data.id);
				this.editForm.controls['responsableDispatching'].patchValue(data.responsableDispatching);
				this.editForm.controls['statut'].patchValue(data.statut);
				/* if (data.membresCommission.length > 0) {
					this.editForm.patchValue({
						membresCommission: '',
					})
				} */
			},
				(err) => {
					console.log(err);
				});
	}

	/* addMembreCommission() {
		this.tabMembresCommission.push(this.editForm.value.membresCommission);
		this.editForm.get('membresCommission').reset()
	}

	deleteMembresCommission(index: number) {
		this.tabMembresCommission.splice(index, 1);
	}
 */
	onSubmit() {
		/* if (this.tabMembresCommission.length != 0) {
			this.editForm.value.membresCommission = this.tabMembresCommission;
		} else if (this.editForm.value.membresCommission != '') {
			this.editForm.value.membresCommission = [this.editForm.value.membresCommission];
		} */
		this.bureauOrdreService.updateObject(
			"/courrierConvocation/edit/",
			this.editForm.value
		).subscribe((data) => {
			console.log(data);
			this.router.navigate([
				"courriers-convocations/list-courriers-convocations",
			]);
		});
	}

	onReset() {
		this.editForm = this.formBuilder.group({
			date: [null],
			heure: [null],
			lieu: [null],
			// membresCommission: [null],
			delai: [null],
			nomCommission: [null],
			ordreJour: [null],
			responsableDispatching: [null],
			statut: [null],
		});
		// this.tabMembresCommission = [];
	}

	backList() {
		this.router.navigate(["courriers-convocations/list-courriers-convocations"]);
	}
}
