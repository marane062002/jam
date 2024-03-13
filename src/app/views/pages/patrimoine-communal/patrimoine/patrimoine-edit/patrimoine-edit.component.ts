import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PatrimoineService } from "../../services/patrimoine.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../shared/notification.service";
import { NotificationType } from "../../../shared/NotificationMessage.service";
import { TranslateService } from "@ngx-translate/core";
import { ModelAddTypeComponent } from "../model-add-type/model-add-type.component";
import { MatDialog, MatTableDataSource } from "@angular/material";
import * as $ from "jquery";
import Swal from "sweetalert2";
import { HttpErrorResponse } from "@angular/common/http";


@Component({
	selector: "kt-patrimoine-edit",
	templateUrl: "./patrimoine-edit.component.html",
	styleUrls: ["./patrimoine-edit.component.scss"],
})
export class PatrimoineEditComponent implements OnInit {
	// ==================================================================
	//
	// ==================================================================
	loading = false;
	patrimoineForm: FormGroup;
	divisions: any;
	origines: any;
	types: any;
	references: any;
	specialites: any;
	villes: any;
	arrondissements: any;
	id: number;

	typesEspaceVert: any;

	formPj = { selecetedFile: {} };

	allpjs = [];

	showAddDoc = false;

	dataSource1: MatTableDataSource<any>;
	dataSource2: MatTableDataSource<any>;

	onDeleteFile(id: number): void {
		Swal.fire({
			title: this.translate.instant("PAGES.PROGRAMME.MESSAGE_SUPPRESSION"),
			icon: 'question',
			iconHtml: '?',
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: this.translate.instant("PAGES.PROGRAMME.OUI"),
			cancelButtonText: this.translate.instant("PAGES.PROGRAMME.NON")
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				this.service
					.deleteByIdFiles(id)
					.subscribe(res => {
						Swal.fire({
							position: 'center',
							icon: 'success',
							title: this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED"),
							showConfirmButton: false,
							timer: 1500
						})
						this.ngOnInit();
					}, (err: HttpErrorResponse) => {
						console.log(err.status);
						console.log(err.headers);

						if (err.status == 500) {

							Swal.fire({
								position: 'center',
								icon: 'error',
								title: "impossible de supprimer cette enregistrement",
								showConfirmButton: false,
								timer: 1500
							})
						}
					})
			}
		})
	}

	displayedColumns1 = ["nomDoc", "actions"];
	displayedColumns2 = ["nomDoc", "dow", "actions"];



	openDialog(): void {
		console.log(this.typesEspaceVert)
		const dialogRef = this.dialog.open(ModelAddTypeComponent, {
			width: '500px',
			data: this.typesEspaceVert,
		});

		dialogRef.afterClosed().subscribe(result => {
			console.log('The dialog was closed');

			this.patrimoineForm.get("categorieMeubles").setValue(result);
			console.log(result);
		});
	}
	// ==================================================================
	//
	// ==================================================================
	constructor(
		private service: PatrimoineService,
		private router: Router,
		private route: ActivatedRoute,
		private fb: FormBuilder,
		public dialog: MatDialog,
		private notification: NotificationService,
		private translate: TranslateService
	) { }
	// ==================================================================
	//
	// ==================================================================
	ngOnInit() {
		this.route.queryParams.subscribe((params) => {
			this.id = params["id"];
		});
		console.log("ID: " + this.id);
		this.getAllPjImm(this.id);
		this.getData();

		this.patrimoineForm = this.fb.group({

			id: [this.id],
			libelle: [''],
			observation: [null],
			numEnregistrement: [''],
			dateEnregistrement: [new Date().toISOString()],
			dateInscription: [new Date().toISOString()],
			typeSpecialite: [''],
			superficie: [null],
			adresse: [null],
			prixAquisition: [null],
			dateEnreCF: [],
			idDivision: [12, Validators.required],
			numEnregistrementCF: [null],
			type: [null, Validators.required],
			//originPatrimoin: [null, Validators.required],
			originPatrimoinText: [null, Validators.required],
			refFonciere: [null, Validators.required],
			ville: [null, Validators.required],
			arrondissement: [null],
			naturePAtrimoine: [null],
			categorieMarche: [null],
			categorieVoies: [null],
			typeCategorieMarche: [null],
			classeMarche: [null],
			typeEspaceVert: [null],
			categorieMeubles: [null],
			statutMarche: [null],
			modificateurUser: [window.localStorage.getItem("fullnameUser")],
			typePropriete: [null],
			typeProprieteLibre: [null]
		})


		this.service.getPatrimoineById(this.id).subscribe((data) => {
			console.log(data)
			this.patrimoineForm.patchValue(data[0]);
			this.selectedTypePropriete(data[0].typePropriete);
			if (data[0].typePropriete != 'عمليات عقارية' && data[0].typePropriete != 'تدبيرالممتلكات' && data[0].typePropriete != 'تحفيظ') {
				this.isSelectedAutre = true;
				this.patrimoineForm.patchValue({
					typeProprieteLibre: data[0].typePropriete,
					typePropriete: 'Autre'
				});
			}
			this.typesEspaceVert = data[0].categorieMeubles;
			if (data[0].dateInscription != null)
				this.patrimoineForm.controls["dateInscription"].patchValue(
					new Date(data[0].dateInscription).toISOString()
				);
			if (data[0].dateEnregistrement != null)
				this.patrimoineForm.controls["dateEnregistrement"].patchValue(
					new Date(data[0].dateEnregistrement).toISOString()
				);
			if (data[0].dateEnreCF != null)
				this.patrimoineForm.controls["dateEnreCF"].patchValue(
					new Date(data[0].dateEnreCF).toISOString()
				);
			/*if (data[0].creationDate != null)
				this.patrimoineForm.controls["creationDate"].patchValue(
					new Date(data[0].creationDate).toISOString()
				);
			if (data[0].updateDate != null)
				this.patrimoineForm.controls["updateDate"].patchValue(
					new Date(data[0].updateDate).toISOString()
				);*/
		});

		/*this.patrimoineForm.get("ville").valueChanges.subscribe((value) => {
			console.log("value: " + value);
			if (value != null) {
				this.patrimoineForm.get("arrondissement").disable();
				this.patrimoineForm
					.get("arrondissement")
					.patchValue({id: 2, libelle: 'جليز'});
				if (value.id == 1) {
					this.patrimoineForm
						.get("arrondissement")
						.patchValue("arrondissement");
				} else {
				}
			}
		});*/
		// ==================================================================
		//
		// ==================================================================

		//    this.ville = this.patrimoineForm.get('ville').value;
	}


	async getAllPjImm(id) {
		await this.service.getAllPjImm(id).subscribe(data => {
			this.dataSource2 = new MatTableDataSource(data);
		}, error => console.log(error));

	}
	// ==================================================================
	//
	// ==================================================================
	get f() {
		return this.patrimoineForm ? this.patrimoineForm.controls : null;
	}
	//get l() { return this.f?this.f.mouvementLs as FormArray:null; }
	// ==================================================================
	//
	// ==================================================================
	getData() {
		this.service.getDataPatrimoine().subscribe(
			(data) => {
				this.origines = data[0];
				this.types = data[1];
				this.divisions = data[2];
				this.references = data[3];
				//        this.specialites = data[4];
				this.villes = data[4];
				this.arrondissements = data[5];
			},
			(err) => {
				console.log(err);
			}
		);
	}

	isSelectedAutre: boolean = false;
	selectedTypePropriete(event: any) {
		if (event == 'Autre') {
			this.isSelectedAutre = true;
		}
		else {
			this.isSelectedAutre = false;
		}
	}

	compareObjects(o1: any, o2: any) {
		return o1.id == o2.id;
	}
	// ==================================================================
	//
	// ==================================================================
	onSelectVille() {
		let ville = this.patrimoineForm.get("ville").value;
		console.log(ville.id);
		if (ville.id == 1) {
			this.patrimoineForm.get("arrondissement").enable();
			this.patrimoineForm.get("arrondissement").reset();
		}
		// else if(ville.id==null){
		//     ville.id == 6
		//     this.patrimoineForm.get('arrondissement').disable();
		//     this.patrimoineForm.get('arrondissement').reset();
		// }
		else {
			this.patrimoineForm.get("arrondissement").disable();
			this.patrimoineForm.get("arrondissement").reset();
		}
	}

	onClickPj(a, e, id) {
		console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);
		console.log(r);
		//window.open(environment.API_ALFRESCO_URL + "/MarcheConvention/"+r);
		this.service.downoldFile(r, a);
	}

	onDeletePj(id: number): void {
		this.allpjs.splice(id, 1);
		if (this.allpjs.length > 0) {
			this.dataSource1 = new MatTableDataSource(this.allpjs);
		} else {
			this.dataSource1 = null
		}
	}


	// ==================================================================
	//
	// ==================================================================
	ajouterMvmL() { }
	// ==================================================================
	//
	// ==================================================================
	onSubmit() {
		if (this.patrimoineForm.get('typeProprieteLibre').value != null) {
			this.patrimoineForm.get('typePropriete').reset();
			this.patrimoineForm.get('typePropriete').setValue(this.patrimoineForm.get('typeProprieteLibre').value);
			this.patrimoineForm.get('typeProprieteLibre').reset();
		  }
		this.patrimoineForm
			.get("modificateurUser")
			.setValue(window.localStorage.getItem("fullnameUser"));
		const formValues = this.patrimoineForm.value;
		const controls = this.patrimoineForm.controls;
		/** check form */
		if (this.patrimoineForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		this.loading = true;
		const patrimoine: any = Object.assign({}, formValues);
		console.log(patrimoine);

		this.service.updatePatrimoine(patrimoine, this.id).subscribe(data => {
			if (this.allpjs.length > 0) {
				for (var i = 0; i < this.allpjs.length; i++) {
					this.service.nouvellepj(this.allpjs[i].selecetedFile, this.id, "Pc")
						.subscribe((data) => {
							console.log("C: " + JSON.stringify(data, null, 2));
						});
				}
			}
			this.notification.sendMessage({
				message: this.translate.instant("PAGES.GENERAL.MSG_SAVED_CONFIRMED"),
				type: NotificationType.success
			});

			if (this.patrimoineForm.get('naturePAtrimoine').value == "publique") {
				this.router.navigate(['patrimoine/exploitation-domaine-public-edit'], { queryParams: { id: this.id } })
			}

			if (this.patrimoineForm.get('naturePAtrimoine').value == "prive") {

				if (this.patrimoineForm.get('type').value.id == "8") {
					this.router.navigate(['/marche/marche-edit'], { queryParams: { id: this.id } })
				}
				else {
					this.router.navigate(['patrimoine/exploitation-domaine-public-edit'], { queryParams: { id: this.id } })
					//	this.router.navigate(['patrimoine/exploitation-domaine-prive-edit'] , { queryParams: { id: this.id} })
				}
			}
		},
			error => console.error(error)
		);
	}

	getTypesByNaturePAtrimoine(): any[] {
		if (this.patrimoineForm.value.naturePAtrimoine)
			return this.types.filter(
				(element) =>
					element.naturePatrimoine ==
					this.patrimoineForm.value.naturePAtrimoine
			);
		return [];
	}

	// ==================================================================
	//
	// ==================================================================
	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.patrimoineForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}

	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}

	validerPj() {
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.showAddDoc = false;
		this.formPj = { selecetedFile: {} };
	}


	back() {
		let id = parseInt(localStorage.getItem('idPatrimoine11122'));
		if (isNaN(id)) {
			this.router.navigate(["/patrimoine/patrimoine-index"]);
		}
		else {
			this.router.navigate(['/patrimoine/patrimoine-show'], { queryParams: { id: id } })
		}
	}
}
