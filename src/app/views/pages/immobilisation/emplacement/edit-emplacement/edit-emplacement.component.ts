import { ImmobilisationService } from './../../../utils/immobilisation.service';
import {
	Component,
	OnInit,
	ViewChild,
	EventEmitter,
	Output
} from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { MatSelectChange, MatSelect } from "@angular/material/select";
import { first } from "rxjs/operators";

@Component({
	selector: "kt-edit-emplacement",
	templateUrl: "./edit-emplacement.component.html",
	styleUrls: ["./edit-emplacement.component.scss"]
})
export class EditEmplacementComponent implements OnInit {
	//==============================
	// declaration des Attributs
	//==============================
	editForm: FormGroup;
	submitted = false;
	devisions: any;
	services: any;
	selectedList: number;
	@ViewChild(MatSelect, { static: true }) matSelect: MatSelect;
	@Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<
		MatSelectChange
	>();
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	constructor(
		private immoService: ImmobilisationService,
		private router: Router,
		private formBuilder: FormBuilder,
		private location: Location
	) {
		let emplacementId = window.localStorage.getItem("editemplacementId");
		if (!emplacementId) {
			alert("Invalid action.");
			this.router.navigate(["emplacement/list-emplacement"]);
			return;
		}
		this.immoService
			.getObjectById("/emplacement/show/", +emplacementId)
			.subscribe(data => {
				this.editForm.patchValue(data);
			});
	}

	// ============================================
	// OnInit
	// ============================================
	ngOnInit() {
		this.formBuild();
		this.getAllDivision();

		//this.selectionChanged(this.editForm.controls[''].value);
	}
	// ============================================
	// OnSubmit
	// ============================================
	onSubmit() {
		this.editEmplacement();
	}
	// ============================================
	// Ajouter un emplacement
	// ============================================
	editEmplacement() {
		this.submitted = true;
		if (this.editForm.invalid) {
			return;
		}
		this.immoService
			.updateObject("/emplacement/edit/", this.editForm.value)
			.pipe(first())
			.subscribe(
				data => {
					this.router.navigate(["emplacement/list-emplacement"]);
					console.log("updated successfuly ...");
				},
				error => {
					alert(error);
				}
			);
	}
	// ============================================
	// Select changed
	// ============================================
	selectionChanged(event: MatSelectChange) {
		this.selectionChange.emit(
			new MatSelectChange(this.matSelect, event.value)
		);
		this.valueChange.emit(event.value);
		this.onChange(event.value);
		this.onTouched();
		console.log("value changed : " + event.value);
		this.selectedList = event.value;
		this.getAllServiceByDivision(this.selectedList);
	}

	// ControlValueAccessor Implementation
	onChange: any = () => {};
	onTouched: any = () => {};
	// ============================================
	// Fourmulaire
	// ============================================
	formBuild() {
		this.editForm = this.formBuilder.group({
			id: [],
			designation: ["", Validators.required],
			description: [""],
			idService: ["", Validators.required]
		});
	}
	// ============================================
	// OnReset
	// ============================================
	onReset() {
		this.submitted = false;
		this.editForm.reset();
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		this.location.back();
	}
	// ============================================
	// Liste des division
	// ============================================
	private getAllDivision() {
		this.immoService.getAllDivision("/divisions/index").subscribe(
			data => {
				this.devisions = data;
				console.log("result division: " + data);
			},
			err => {
				console.log(err);
			}
		);
	}
	// ============================================
	// Liste des services
	// ============================================
	private getAllServiceByDivision(id: number) {
		this.immoService.getAllObjectById("/services/divisions/", id).subscribe(
			data => {
				this.services = data;
				console.log("result service division : " + data);
			},
			err => {
				console.log(err);
			}
		);
	}
}
