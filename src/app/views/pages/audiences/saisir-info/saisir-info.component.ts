import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl, NgForm } from '@angular/forms';
import { Journee } from '../../../../core/_base/layout/models/abattoir/journee';
import { JourneeService } from '../service/journee.service';
import { EspeceService } from '../service/espece.service';
import { HttpResponse } from '@angular/common/http';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { Chevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
import { ChevillardService } from '../service/chevillard.service';

@Component({
	selector: 'kt-saisir-info',
	templateUrl: './saisir-info.component.html',
	styleUrls: ['./saisir-info.component.scss']
})

export class SaisirInfoComponent implements OnInit {
	journee: Journee;
	chevillard: Chevillard;
	submitted: boolean = false;
	especes: Espece[] | null;
	chevillards: Chevillard[] | null;
	data: any[];
	editRecord = null;
	formDataJournee = [];
	journeeSaveForm: FormGroup;
	columns = [];
	listEspeces = [];
	assoc: any;
	nombre: number = 0;
	validatedAdd: boolean = false;
	indexEspece = null;
	editAdd: boolean = false;
	@ViewChild('formJournee', { static: false }) Forms1: NgForm
	constructor(private router: Router,
		private journeeService: JourneeService,
		private especeService: EspeceService,
		private chevillardService: ChevillardService,
		private fb: FormBuilder) {

	}

	initForm() {
		this.journeeSaveForm = this.fb.group({
			dateJournee: [null, Validators.required],
			chevillards: new FormGroup({
				id: new FormControl('', Validators.required),
			}),

			journeeEspeces: new FormGroup({
				espece:new FormGroup({
				id: new FormControl('', Validators.required)
				}),
				nombreBetes: new FormControl('', Validators.required),
				nombreNonAbattu: new FormControl(null),
				nombreAbattu: new FormControl(null),

			}),

			nombreT: [''],
		})
	}

	ngOnInit() {
		this.initForm();
		localStorage.removeItem('mydataJ');
		let itemsJ = JSON.parse(localStorage.getItem('mydataJ'));
		console.log('items', itemsJ)
		if (itemsJ != null) {
			if (itemsJ.length) {
				this.formDataJournee = itemsJ;
				console.log('inside if formData', this.formDataJournee);
			}
		}


		this.chevillardService.getAllChevillards()
			.then(res => {
				this.chevillards = res
				
				console.log(this.chevillards);

			}, err => {
				console.log(err);
			});
		

		this.especeService.query().subscribe({
			next: (res: HttpResponse<Espece[]>) => {
				this.especes = res.body;
				console.log(this.especes);
			},

			error: () => { },
		})
	}
	back() {
		this.router.navigate(["audiences/list-info"]);
	}

	onAdd() {
		this.isCalculated=false;
		this.nombre = 0;
		if (this.editAdd == false) {
			this.listEspeces.push(this.journeeSaveForm.value.journeeEspeces);
			console.log("listEspeces: " + JSON.stringify(this.listEspeces));
			this.journeeSaveForm.controls['journeeEspeces'].reset();
		}
		if (this.editAdd == true) {
			for (let i in this.listEspeces) {
				if (i == this.indexEspece) {
					this.listEspeces[i] = this.journeeSaveForm.value.journeeEspeces;
				}
			}
		}
		this.journeeSaveForm.controls['journeeEspeces'].reset()
		this.editAdd = false;
	}

	onDelete(item) {
		this.isCalculated=false;
		this.nombre = 0;
		const i = this.listEspeces.indexOf(item);
		if (i !== -1) {
			this.listEspeces.splice(i, 1);
		}
	}

	onEdit(item) {
		this.isCalculated=false;
		this.editAdd = true;
		this.journeeSaveForm.controls['journeeEspeces'].setValue(item);
		this.indexEspece = this.listEspeces.indexOf(item);
	}


	validateAdd() {
		this.validatedAdd = true;
		this.calculerNombreTotal();
	}

	isCalculated:boolean=false;
	calculerNombreTotal() {
		for (let i in this.listEspeces) {
			this.nombre += this.listEspeces[i].nombreBetes;
		}
		this.isCalculated=true;
	}

	convertData() {
		this.journeeSaveForm.value.journeeEspeces = this.listEspeces;
		this.journeeSaveForm.value.nombreT = this.nombre;
	}

	onSubmitAll() {
		this.convertData();
		this.saveJournee(this.journeeSaveForm.value);
	}

	saveJournee(journee) {
		if (journee!.dateJournee) {
			journee.dateJournee = new Date(journee.dateJournee)
		}
		this.journeeService.createJournee(journee).subscribe(data => { console.log(data), this.back() }, error => console.log("Error: " + JSON.stringify(error)));
	}

	ValueIdChevillards: any[];
	setMultipleSelectChevillards() {
		console.log('ValueIdChevillards', this.ValueIdChevillards);
		let chevillard: any[] = [];
		if (this.ValueIdChevillards) {
			chevillard.push({
				id: this.ValueIdChevillards,
			})
		}
		console.log('chevillard', chevillard);
		this.journeeSaveForm.patchValue({ chevillards: chevillard });
		console.log(this.journeeSaveForm.value);
	}

	ValueIdEspeces: any[];
	setMultipleSelectEspeces() {
		console.log('ValueIdEspeces', this.ValueIdEspeces);
		let espece: any[] = [];
		if (this.ValueIdEspeces) {
			espece.push({
				id: this.ValueIdEspeces,
			})
		}
		console.log('espece', espece);
		this.journeeSaveForm.patchValue({ journeeEspeces: espece });
		console.log(this.journeeSaveForm.value);
	}

}
