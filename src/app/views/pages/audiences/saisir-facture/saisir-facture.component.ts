import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { MatRadioChange } from '@angular/material';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { EspeceService } from '../service/espece.service';
import { HttpResponse } from '@angular/common/http';
import { Facture } from '../../../../core/_base/layout/models/abattoir/facture';
import { FactureService } from '../service/facture.service';
import { ArreteFiscalService } from '../service/arrete-fiscal.service';
import { ArreteFiscal, IArreteFiscal } from '../../../../core/_base/layout/models/abattoir/arrete-fiscal';
@Component({
	selector: "kt-saisir-audiences",
	templateUrl: "./saisir-facture.component.html",
	styleUrls: ["./saisir-facture.component.scss"],
})
export class SaisirFactureComponent implements OnInit {
	facture: Facture;
	type: Espece[];
	arreteFiscals: any;

	listFactures = [];
	editAdd: boolean = false;
	indexFacture = null;
	montantTotal: number = 0;

	fullArreteFiscal: boolean = false;
	canSave: boolean = false;

	factureSaveForm: FormGroup;
	factureSaveForm2: FormGroup;

	isChecked: Boolean = false;

	Balance = [
		{
			id: 1,
			name: 'OUI'
		},
		{
			id: 2,
			name: 'NON'
		}];
	Abattage = [{ label: 'Exceptionnel', checked: false }, { label: 'Normal', checked: false }];


	showTable: boolean = false;


	selected = 'two'
	submitted = false;
	editRecordId = null;
	formData = [];
	title = 'Forms';
	@ViewChild('f', { static: false }) Forms: NgForm;

	assoc: any;

	ELEMENT_DATA: any[] = [];
	data: any[];

	columns: any[];
	footerData: any[][] = [];

	displayedColumns: string[] = [
		"especes",
		"NombreTètes",
		"NombreTètesEquarraise",
		"PoidsNetCons",
		"PoidsNetNCons",
		"PoidsNet",
		"TypeAbattage",
		"AvecBallance",
		"actions",
	];
	donnees: any[] = [];
	columnss: any[];
	footerDataa: any[][] = [];
	displayedColumnss: string[] = [
		"codeNature",
		"libelle",
		"espece",
		"montant",
		"actions",
	];

	dataSource = new MatTableDataSource<any>();

	dataSourceR = new MatTableDataSource<any>();

	dataSourcet = new MatTableDataSource(this.ELEMENT_DATA);
	isLoadingResults = true;
	isLoading = true;


	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	constructor(


		private translate: TranslateService,
		private router: Router,
		private especeService: EspeceService,
		private arreteFiscal: ArreteFiscalService,
		private factureService: FactureService,
		private fb: FormBuilder,
		private excelService: ExcelAssociationService,
	) {
		this.donnees = [{
			"CodeNature": "1140103041",
			"Libelle": "REDEVANCES SUR LES HALLES AUX PEAUX ET CUIR/UNITE",
			"Montant": "21.00"
		},
		{
			"CodeNature": "1110403031",
			"Libelle": "RISTOURNE SUR LES RECETTES RÉALISÉES POUR LE COMPTE DES TIERS",
			"Montant": "215.00",
		}
		]
	}

	initForm() {
		this.factureSaveForm = this.fb.group({
			balance: ['', Validators.required],
			espece: new FormGroup({
				id: new FormControl('')
			}),
			dureeSejour: ['', Validators.required],
			dureeSejourFrigo: ['', Validators.required],

			nombreTetes: ['', Validators.required],
			nombreTetesEquaraisse: ['', Validators.required],
			poidsNConsom: ['', Validators.required],
			poidsNNonConsom: ['', Validators.required],
			poidsNCacher: ['', Validators.required],
			typeAbattage: ['', Validators.required]


		})

		this.factureSaveForm2 = this.fb.group({
			especeFactures: [''],
			montanttotal: ['']
		})
	}

	arretesFiscalsChecked = [];
	getLineChecked(event: any) {
		if (event.isChecked != true) {
			this.canSave = true;
			event.isChecked = true;
			this.arretesFiscalsChecked.push(event);
		} else {
			event.isChecked = false;
			let indexToRemove = this.arretesFiscalsChecked.findIndex((obj) => obj.id === event.id);
			this.arretesFiscalsChecked.splice(indexToRemove, 1);
			if (this.arretesFiscalsChecked.length == 0) {
				this.canSave = false;
			}
		}
	}

	ngOnInit() {
		this.initForm();
		localStorage.removeItem('myData');
		let items = JSON.parse(localStorage.getItem('mydata'));
		console.log('items', items)
		if (items != null) {
			if (items.length) {
				this.formData = items;
				console.log('inside if formData', this.formData);
			}
		}
		this.columnss = [
			"CodeNature",
			"Libelle",
			"Montant",
		];
		this.columns = [
			"especes",
			"NombreTètes",
			"NombreTètesEquarraise",
			"PoidsNetCons",
			"PoidsNetNCons",
			"PoidsNet",
			"TypeAbattage",
			"AvecBallance"];

		this.especeService.query().subscribe({
			next: (res: HttpResponse<Espece[]>) => {
				this.type = res.body;
			},

			error: () => { },
		})
		this.arreteFiscal.getAllArretesFiscales().then(
			(res: HttpResponse<IArreteFiscal[]>) => {
				this.arreteFiscals = res;
			},

			(error: any) => { },
		)
	}




	arreteFiscalsFilteres = [];
	toggleShowTable(): void {
		for (let i = 0; i < this.arreteFiscals.length; i++) {
			for (let j = 0; j < this.listFactures.length; j++) {
				if (this.arreteFiscals[i].espece.id == this.listFactures[j].espece.id) {
					this.arreteFiscalsFilteres.push(this.arreteFiscals[i])
				}
			}
		}
		this.dataSourceR = new MatTableDataSource(this.arreteFiscalsFilteres);
		this.paginator._intl.itemsPerPageLabel = this.translate.instant('PAGES.GENERAL.ITEMS_PER_PAGE_LABEL');
		this.dataSourceR.paginator = this.paginator;
		this.dataSourceR.sort = this.sort;
		this.showTable = !this.showTable;
	}

	valider() {
		this.onSubmitAll();
	}

	onSubmit() {
		this.submitted = true;
		console.log('===================================>', this.data);


		if (this.editRecordId) {
			this.formData = this.formData.map((data) => data.id === this.editRecordId ? this.Forms.value : data)
			console.log('==================================*********=>', this.Forms.value);
			this.editRecordId = null;
		} else {
			const id = Date.now();
			console.log('form value', this.Forms.value);
			const data = {
				id,
				...this.Forms.value
			}
			this.formData.push(data);
			localStorage.setItem('mydata', JSON.stringify(this.formData));
			console.log('myData', JSON.parse(localStorage.getItem('mydata')));
		}


		this.Forms.reset();
	}

	onAdd() {
		this.montantTotal;
		this.fullArreteFiscal = true;
		if (this.editAdd == false) {
			this.listFactures.push(this.factureSaveForm.value);
			console.log("listFactures:" + JSON.stringify(this.listFactures));
			this.factureSaveForm.reset();
		}
		if (this.editAdd == true) {
			for (let i in this.listFactures) {
				if (i == this.indexFacture) {
					this.listFactures[i] = this.factureSaveForm.value;
				}
			}
		}
		this.factureSaveForm.reset();
		this.editAdd = false;
	}

	onEdit(item) {
		this.editAdd = true;
		this.factureSaveForm.setValue(item);
		this.indexFacture = this.listFactures.indexOf(item);
		this.arretesFiscalsChecked = [];
		this.arreteFiscalsFilteres = [];
		this.listMontants = [];
		if (this.showTable == false) {
			this.showTable = false;
		} else {
			this.showTable = !this.showTable;
		}
		this.fullArreteFiscal = false;
		this.canSave = false;
	}

	onDelete(item) {
		this.montantTotal = 0;
		const i = this.listFactures.indexOf(item);
		if (i !== -1) {
			this.listFactures.splice(i, 1);
		}
		this.arretesFiscalsChecked = [];
		this.arreteFiscalsFilteres = [];
		this.listMontants = [];
		if (this.showTable == false) {
			this.showTable = false;
		} else {
			this.showTable = !this.showTable;
		}
		if (this.listFactures.length == 0) {
			this.fullArreteFiscal = false;
		}
		this.canSave = false;
	}
	montant;
	listMontants = [];
	onSubmitAll() {
		for (let j = 0; j < this.listFactures.length; j++) {
			this.montant = 0;
			for (let i = 0; i < this.arretesFiscalsChecked.length; i++) {
				if (this.arretesFiscalsChecked[i].espece.id == this.listFactures[j].espece.id) {
					this.montant += this.arretesFiscalsChecked[i].tarif
				}
			}
			this.listMontants.push(this.montant);
		}
		for (let i = 0; i < this.listFactures.length; i++) {
			for (let j = 0; j < this.listMontants.length; j++) {
				this.listFactures[i].montant = this.listMontants[i] * this.listFactures[i].dureeSejourFrigo * this.listFactures[i].poidsNConsom;
			}
		}
		for (let i = 0; i < this.listFactures.length; i++) {
			this.montantTotal += this.listFactures[i].montant;
		}
		this.factureSaveForm.value.especeFactures = this.listFactures;
		this.factureSaveForm.value.montanttotal = this.montantTotal;
		this.saveFacture(this.factureSaveForm.value)
	}

	saveFacture(facture) {
		this.factureService.createFacture(facture).subscribe(
			data => {
				console.log("Data: " + JSON.stringify(data));
				this.router.navigate(["audiences/list-facture"]);
			},
			error => console.log("Error: " + JSON.stringify(error)));
	}


	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}


	addAssociation(): void {
		this.router.navigate(["audiences/edit-facture"]);
	}
	add(): void {

	}

	consulterDetail(): void {
		this.router.navigate(["audiences/add-facture"]);

	}

	deleteAssociation(id: number): void {
		Swal.fire({
			title: 'Voulez vous supprimer cet enregistrement ?',
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: 'Oui',
			cancelButtonText: 'Non',
		}).then((result) => {
			if (result.isConfirmed) {

				Swal.fire({
					position: 'center',
					icon: 'success',
					title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
					showConfirmButton: false,
					timer: 1500
				})


			}
		})
	}

	exportTable() {
		this.excelService.exportAsExcelFile('Liste audiences', '', this.columns, this.data, this.footerData, 'Liste-audiences', this.translate.instant("PAGES.AFFAIRE.TITRE_INDEX"))
	}

	createDataJson(i: number): data {
		return {
			especes: this.assoc[i].especes,
			NombreTètes: this.assoc[i].NombreTètes,
			NombreTètesEquarraise: this.assoc[i].NombreTètesEquarraise,
			PoidsNetCons: this.assoc[i].PoidsNetCons,
			PoidsNetNCons: this.assoc[i].PoidsNetNCons,
			PoidsNet: this.assoc[i].PoidsNet,
			TypeAbattage: this.assoc.TypeAbattage,
			AvecBallance: this.assoc.AvecBallance
		};
	}
}

export interface data {
	especes: string,
	NombreTètes: string,
	NombreTètesEquarraise: string,
	PoidsNetCons: string,
	PoidsNetNCons: string,
	PoidsNet: string,
	TypeAbattage: string,
	AvecBallance: string,
}
