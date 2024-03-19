import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConventionMarcheService } from "../../../shared/conventionService";
import * as $ from "jquery";
@Component({
	selector: "kt-add-convention",
	templateUrl: "./add-convention.component.html",
	styleUrls: ["./add-convention.component.scss"],
})
export class AddConventionComponent implements OnInit {
	isVisible: any;
	isSelected: boolean = false;
	formConvention: FormGroup;
	convention_id
	isUpdate: boolean = false;
	formPj = { type: 0, selecetedFile: {} };
	allpjs = [];
	constructor(private router: Router,
		private activatedRoute: ActivatedRoute,
		private conventionMarcheService: ConventionMarcheService) {
		this.isUpdate = false;
		this.formConvention = new FormGroup({
			id: new FormControl(''),
			object: new FormControl(''),
			objectAr: new FormControl(''),
			abreviation: new FormControl(''),
			montant: new FormControl(''),
			duree: new FormControl(''),
			date: new FormControl(''),
			dateSignature: new FormControl(''),
			dateBO: new FormControl(''),
			dateDebut: new FormControl(''),
			dateAchevement: new FormControl(''),
			etatConvention: new FormControl(''),
		});
	}
	minDate
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe(params => {
			this.convention_id = params['id'];
			if (this.convention_id != undefined && this.convention_id != 0) {
				this.isUpdate = true;
				this.conventionMarcheService.findById(this.convention_id).subscribe((res: any) => {
					if (res.montant != null) {
						res.montant = res.montant.toLocaleString('fr', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
					}

					this.formConvention.patchValue(res);
					// this.formConvention.value.dateSignature=new Date(res.dateSignature.getFullYear() + "/" + (res.dateSignature.getMonth() + 1) + "/" + res.dateSignature.getDate()+' '); 

			

					const dateSignature = new Date(res.dateSignature);

					// Check if dateSignature is a valid Date object
					if (!isNaN(dateSignature.getTime())) {
						// If it's a valid Date object, set it directly to the form control
						this.formConvention.get('dateSignature').setValue(dateSignature.toISOString().split('T')[0]);
					} else {
						// Handle the case where dateSignature is not a valid date
						console.error('Invalid dateSignature:', res.dateSignature);
					}	
				
				
					const dateBO = new Date(res.dateBO);

					// Check if dateSignature is a valid Date object
					if (!isNaN(dateBO.getTime())) {
						// If it's a valid Date object, set it directly to the form control
						this.formConvention.get('dateBO').setValue(dateBO.toISOString().split('T')[0]);
					} else {
						// Handle the case where dateSignature is not a valid date
						console.error('Invalid dateBO:', res.dateBO);
					}	
					const dateDebut = new Date(res.dateDebut);

					// Check if dateSignature is a valid Date object
					if (!isNaN(dateDebut.getTime())) {
						// If it's a valid Date object, set it directly to the form control
						this.formConvention.get('dateDebut').setValue(dateDebut.toISOString().split('T')[0]);
					} else {
						// Handle the case where dateSignature is not a valid date
						console.error('Invalid dateDebut:', res.dateDebut);
					}	
					const dateAchevement = new Date(res.dateAchevement);

					// Check if dateSignature is a valid Date object
					if (!isNaN(dateAchevement.getTime())) {
						// If it's a valid Date object, set it directly to the form control
						this.formConvention.get('dateAchevement').setValue(dateAchevement.toISOString().split('T')[0]);
					} else {
						// Handle the case where dateSignature is not a valid date
						console.error('Invalid dateAchevement:', res.dateAchevement);
					}	
				}, err => {
					console.log(err);
				})
			}
			else {
				this.isUpdate = false;
				this.formConvention = new FormGroup({
					id: new FormControl(''),
					object: new FormControl(''),
					objectAr: new FormControl(''),
					abreviation: new FormControl(''),
					montant: new FormControl(''),
					duree: new FormControl(''),
					date: new FormControl(''),
					dateSignature: new FormControl(''),
					dateBO: new FormControl(''),
					dateDebut: new FormControl(''),
					dateAchevement: new FormControl(''),
					etatConvention: new FormControl(''),

				});
				this.formConvention.get('dateDebut').valueChanges.subscribe((dateDebut: string) => {
					this.minDate = dateDebut;
				  });
			}
		})
	}

	Retour() {
		this.router.navigate(["/convention/listconvention"]);
	}

	onSubmit() {
		console.log(this.formConvention.value);
		if (this.formConvention.value.id != null) {
			if (this.formConvention.value.montant != null) {
				this.formConvention.value.montant = parseFloat((this.formConvention.value.montant).replace(/\s/, ''));
				this.formConvention.value.montant = parseFloat((this.formConvention.value.montant).toFixed(2));
			}
		}
		
		this.conventionMarcheService.save(this.formConvention.value).subscribe(res => {
			let id = JSON.parse(res).id;
			if (this.allpjs.length > 0 && id != undefined) {
				for (var i = 0; i < this.allpjs.length; i++) {
					this.conventionMarcheService.nouvellepj(this.allpjs[i].selecetedFile, id, "ConventionMrche")
						.subscribe((data) => {

							console.log("C: " + JSON.stringify(data, null, 2));
						});
				}
			}
			this.Retour();
		}, err => {
			console.log(err)
		})
	}
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		this.allpjs.push(this.formPj);
	}
}
