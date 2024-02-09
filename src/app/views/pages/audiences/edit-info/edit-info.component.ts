import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from "@angular/material";
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ExcelAssociationService } from '../../utils/excel-association.service';
import { JourneeService } from '../service/journee.service';
import { ChevillardService } from '../service/chevillard.service';
import { EspeceService } from '../service/espece.service';
import { HttpResponse } from '@angular/common/http';
import { Chevillard } from '../../../../core/_base/layout/models/abattoir/chevillard';
import { Espece } from '../../../../core/_base/layout/models/abattoir/espece';
import { indexOf } from 'lodash';

@Component({
	selector: 'kt-edit-chevillard',
	templateUrl: './edit-info.component.html',
	styleUrls: ['./edit-info.component.scss']
})
export class EditInfoComponent implements OnInit {
	id: number;
	assoc: any;
	data: any[] = [];
	columns: any[];
	footerData: any[][] = [];
	especesJournee;
	validatedEdit: boolean = false;
	// ============================================
	// Presentation de datasource
	// ============================================
	displayedColumns: string[] = [
		"Especes",
		"Nombre",
		"NombreAbatue",
		"ResteNonAbatue",


	];
	ediTable: { // this is optional
		add: true, // this determines if the "Add New Row" button will be displayed
		edit: true // this determines if the "Edit Row" button will be displayed after each row
	}

	dataSource = new MatTableDataSource<any>();
	isLoadingResults = true;
	isLoading = true;
	journeeUpdateForm: FormGroup
	nombreAbattue: number = 0;
	nombreNonAbattue: number = 0;

	// ============================================
	// Controles pagination
	// ============================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	// ============================================
	// Constructeur
	// ============================================
	constructor(

		private translate: TranslateService,
		private router: Router,
		private journeeService: JourneeService,
		private fb: FormBuilder,
		private datePipe: DatePipe,
		private excelService: ExcelAssociationService,
		private route: ActivatedRoute,
		private chevillardService: ChevillardService,
		private especeService: EspeceService
	) {
		this.route.queryParams.subscribe(params => {
			this.id = params['id'];
		})
		this.journeeUpdateForm = this.fb.group({
			id: [''],
			nombreT: [''],
			nombreTBattus: ['', Validators.required],
			nombreTNonBattus: ['', Validators.required],
			dateJournee: ['', Validators.required],
			chevillards: new FormGroup({
				id: new FormControl('', Validators.required),
			}),
			journeeEspeces: new FormGroup({
				espece: new FormGroup({
					id: new FormControl('', Validators.required)
				}),
				nombreBetes: new FormControl('', Validators.required),
				nombreAbattu: new FormControl('', Validators.required),
				nombreNonAbattu: new FormControl('', Validators.required)
			}),

		}
		)
		this.getData();
		this.data = [{


			"Especes": "mouton",
			"Nombre": "20",
			"NombreAbatue": "18",
			"ResteNonAbatue": "2",

		},
		{

			"Especes": "boeuf",
			"Nombre": "50",
			"NombreAbatue": "50 ",
			"ResteNonAbatue": "0",

		},
		{

			"Especes": "agneau",
			"Nombre": "100",
			"NombreAbatue": "90",
			"ResteNonAbatue": "10",

		},
		{

			"Especes": "veau",
			"Nombre": "60",
			"NombreAbatue": "35",
			"ResteNonAbatue": "25",

		}


		]


	}


	dateJournee
	getData() {
		this.journeeService.getJourneeById(this.id)
			.then(data => {
				if (data.nombreTBattus != null) {
					this.nombreAbattue = data.nombreTBattus;
				}
				if (data.nombreTNonBattus != null) {
					this.nombreNonAbattue = data.nombreTNonBattus;
				}
				console.log("Data: " + JSON.stringify(data));
				this.especesJournee = data.journeeEspeces;
				for (let i = 0; i < this.especesJournee.length; i++) {
					if (this.especesJournee[i].nombreAbattu != null) {
						this.validatedEdit=true;
						this.abattu.push(this.especesJournee[i].nombreAbattu);
					}
					if (this.especesJournee[i].nombreNonAbattu != null) {
						this.validatedEdit=true;
						this.nonAbattu.push(this.especesJournee[i].nombreNonAbattu);
					}
				}
				console.log("especesJournee: " + JSON.stringify(this.especesJournee));
				this.journeeUpdateForm.get('chevillards').get('id').setValue(data.chevillards.id)
				this.journeeUpdateForm.patchValue(data);
				this.dateJournee = this.datePipe.transform(data.dateJournee, 'yyyy-MM-dd HH:mm');
			});
	}

	especes: any[] = [];
	chevillards: any[] = [];
	ngOnInit() {
		this.columns = [

			"Especes",
			"Nombre",
			"NombreAbatue",
			"ResteNonAbatue",

		],
			this.dataSource = new MatTableDataSource(this.data);

		this.dataSource = new MatTableDataSource(this.data);

		this.chevillardService.query().subscribe({
			next: (res: HttpResponse<Chevillard[]>) => {
				this.chevillards = res.body;
				console.log(this.chevillards);
			},

			error: () => { },
		})

		this.especeService.query().subscribe({
			next: (res: HttpResponse<Espece[]>) => {
				this.especes = res.body;
				console.log(this.especes);
			},

			error: () => { },
		})

	}

	validateEdit() {
		this.validatedEdit = true;
		this.calculerNombreTotalNonAbattu();
		this.calculerNombreTotalAbattu();
		if (this.nombreAbattue + this.nombreNonAbattue > this.journeeUpdateForm.value.nombreT) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: 'La somme des bêtes abattus et des bêtes non battus est supérieure au total des bêtes',
				showConfirmButton: false,
				timer: 5000,
			});
			this.reinitialiserEdit();
		}
		else if (this.nombreAbattue + this.nombreNonAbattue < this.journeeUpdateForm.value.nombreT) {
			Swal.fire({
				position: "center",
				icon: "error",
				title: 'La somme des bêtes battus et des bêtes non battus est inférieure au total des bêtes',
				showConfirmButton: false,
				timer: 5000,
			});
			this.reinitialiserEdit();
		}
	}

	reinitialiserEdit() {
		this.validatedEdit = false;
		this.nombreAbattue = 0;
		this.nombreNonAbattue = 0;
		this.nonAbattu = [];
		this.abattu = [];
		this.journeeUpdateForm.get('nombreTNonBattus').reset();
		this.journeeUpdateForm.get('nombreTBattus').reset();
		for (let i = 0; i < this.especesJournee.length; i++) {
			if (this.especesJournee[i].nombreAbattu != null && this.especesJournee[i].nombreNonAbattu != null) {
				this.especesJournee[i].nombreAbattu = null;
				this.especesJournee[i].nombreNonAbattu = null;
			}
			else{
				this.getData();
			}
		}
		
	}


	calculerNombreTotalAbattu() {
		console.log("Nombre Total Abatue");
		for (let i = 0; i < this.abattu.length; i++) {
			this.nombreAbattue += parseInt(this.abattu[i]);
		}
	}

	calculerNombreTotalNonAbattu() {
		console.log("Nombre Total Abatue");
		for (let i = 0; i < this.nonAbattu.length; i++) {
			this.nombreNonAbattue += parseInt(this.nonAbattu[i]);
		}
	}

	abattu = [];
	nonAbattu = [];
	changeTotalNombreAbattu(event: any, i: number) {
		this.abattu.push(parseInt(event.target.value));
	}
	changeTotalNombreNonAbattu(event: any, i: number) {
		this.nonAbattu.push(parseInt(event.target.value));
	}

	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	addAssociation(): void {

	}
	add(): void {
		this.router.navigate(["audiences/saisir-info"]);
	}

	back() {
		this.router.navigate(["audiences/list-info"]);
	}

	edit() {
		const combinedArray = this.especesJournee.map((item, index) => ({
			espece: {
				id: item.espece.id
			},
			id: this.especesJournee[index].id,
			nombreBetes: item.nombreBetes,
			nombreAbattu: this.abattu[index],
			nombreNonAbattu: this.nonAbattu[index]
		}));
		this.journeeUpdateForm.value.journeeEspeces = combinedArray;
		this.journeeUpdateForm.value.nombreTNonBattus = this.nombreNonAbattue;
		this.journeeUpdateForm.value.nombreTBattus = this.nombreAbattue;
		const formValues = this.journeeUpdateForm.value;
		const journee: any = Object.assign({}, formValues);
		console.log('chevillard: ' + JSON.stringify(journee));
		this.editJournee(journee);
	}

	editJournee(journee) {
		this.journeeService.updateJournee(journee).subscribe(data => { console.log(data), this.back() }, error => console.log(error));
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

}
