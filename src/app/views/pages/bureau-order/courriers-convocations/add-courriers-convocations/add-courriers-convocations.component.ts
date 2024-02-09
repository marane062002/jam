import { environment } from './../../../../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'kt-add-courriers-convocations',
	templateUrl: './add-courriers-convocations.component.html',
	styleUrls: ['./add-courriers-convocations.component.scss']
})
export class AddCourriersConvocationsComponent implements OnInit {
	language=localStorage.getItem('language');
	addForm: FormGroup;
	// tabMembresCommission = [];
	loading:any;


	constructor(private formBuilder: FormBuilder, private router: Router, private bureauOrdreService: BoServiceService,private translate:TranslateService) {
	}

	ngOnInit() {
		this.addForm = this.formBuilder.group({
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
		this.addForm
			.get("statut")
			.setValue(
				this.translate.instant(
					"PAGES.BUREAU_ORDRE.EN_ATTENTE_DISPATCHING"
				)
			);
	}

	/* addMembreCommission() {
		this.tabMembresCommission.push(this.addForm.value.membresCommission);
		this.addForm.get('membresCommission').reset()
	}

	deleteMembresCommission(index: number) {
		this.tabMembresCommission.splice(index, 1);
	} */

	onSubmit() {
		/* if (this.tabMembresCommission.length != 0) {
			this.addForm.value.membresCommission = this.tabMembresCommission;
		} else if (this.addForm.value.membresCommission != '') {
			this.addForm.value.membresCommission = [this.addForm.value.membresCommission];
		} */
		this.bureauOrdreService.createObject("/courrierConvocation/new", this.addForm.value).subscribe((data) => {
			console.log(data);
			this.router.navigate([
				"courriers-convocations/list-courriers-convocations",
			]);
		});
	}

	onReset() {
		this.addForm = this.formBuilder.group({
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
		this.addForm
			.get("statut")
			.setValue(
				this.translate.instant(
					"PAGES.BUREAU_ORDRE.EN_ATTENTE_DISPATCHING"
				)
			);
		// this.tabMembresCommission = [];
	}

	backList() {
		this.router.navigate(["courriers-convocations/list-courriers-convocations"]);
	}

}
