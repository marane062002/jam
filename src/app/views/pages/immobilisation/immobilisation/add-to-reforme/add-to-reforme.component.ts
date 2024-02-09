import { ImmobilisationService } from './../../../utils/immobilisation.service';
import {
	Component,
	OnInit,
	ViewChild,
	EventEmitter,
	Output
} from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSelect, MatSelectChange, MatDatepickerInputEvent, MatRadioChange } from "@angular/material";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { first } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

@Component({
	selector: "kt-add-to-reforme",
	templateUrl: "./add-to-reforme.component.html",
	styleUrls: ["./add-to-reforme.component.scss"]
})
export class AddToReformeComponent implements OnInit {
	// ============================================
	// Declarations
	// ============================================
	loading = false;
	addForm: FormGroup;
	submitted = false;
	typeImmobilisation: any;
	motifs: any;
	sousTypes: any;
	selected: number;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;
	now: Date;
	diffTime: number;
	diffDay: number;
	dateSelect: Date;
	details: any;
	dateAquisition:Date;
	constructor(
		private immoService: ImmobilisationService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location
	) {

	}
	// =====================================
	// Afficher les details immobilisation
	// =====================================
	ngOnInit() {
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation/list-immobilisation"]);
			return;
		}
		this.immoService
			.getObjectById("/immobilisation/show/", +immoId)
			.subscribe(
				data => {
					this.details = data;
					this.addForm.get('dateAcquisition').patchValue(data.dateAcquisition);
				},
				error => console.log(error)
			);

		this.getAllMotifs();

		this.formBuild(immoId);
	}
	// ============================================
	// Fourmulaire
	// ============================================
	formBuild(id:any) {
		this.addForm = this.formBuilder.group({
			id: [id],
			descriptionReforme: [""],
			dateReformeFinal:["", Validators.required],
			dureeVieFinal:[""],
			motifReforme: this.formBuilder.group({
				id: []
			}),
			dateAcquisition: ["", Validators.required],
		});
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		this.addReformeImmobilisation();
	}
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// ============================================
	// Ajouter un immobilisation
	// ============================================
	addReformeImmobilisation() {
		/* this.submitted = true;
		if (this.addForm.invalid) {
			return;
		} */

		this.immoService
			.updateObject("/reformeImmobilisation/edit/", this.addForm.value)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate([
						"immobilisation/list-immobilisation"
					]);

				},
				error => {
					alert(error);
				}
			);
			this.loading = true;
	}


	// ============================================
	// Liste des motifs
	// ============================================
	private getAllMotifs() {
		this.immoService.getAllObject("/motifReforme/index").subscribe(
			data => {
				this.motifs = data;
			},
			err => {
				console.log(err);
			}
		);
	}
	// ============================================
	// Date changed
	// ============================================
	dateChanged(type: string, event: MatDatepickerInputEvent<Date>) {
		this.addForm.get("dureeVieFinal").setValue(this.getDayBetwinTwoDate());
	}
	// ============================================
	// Calcul days betwin two dates
	// ============================================
	getDayBetwinTwoDate() {
		let d = this.addForm.get('dateAcquisition').value;
		let dateAquiz = new Date(d);
		console.log("calcul DATE: " + dateAquiz.getTime());
		if(dateAquiz != null){
			this.dateSelect = this.addForm.get("dateReformeFinal").value;
			console.log("time: " + this.dateSelect.getTime());
			this.diffTime = Math.round(this.dateSelect.getTime() - dateAquiz.getTime());
			this.diffDay = Math.round(this.diffTime / (1000 * 3600 * 24));
		}
		return this.diffDay;
	}
	// ============================================
	// Methode de modification des immobilisations
	// ============================================
	editImmobilisation(): void {
		let immoId = window.localStorage.getItem("immobilisation-showId");
		if (!immoId) {
			alert("Invalid action.");
			this.router.navigate(["immobilisation/list-immobilisation"]);
			return;
		}
		window.localStorage.removeItem("editImmobilisationId");
		window.localStorage.setItem("editImmobilisationId",immoId);
		this.router.navigate(["immobilisation/edit-immobilisation"]);
	}
}
