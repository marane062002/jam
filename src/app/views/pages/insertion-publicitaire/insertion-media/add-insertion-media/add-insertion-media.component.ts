import { Component, OnInit } from "@angular/core";
import {
	Validators,
	FormControl,
	FormBuilder,
	FormGroup
} from "@angular/forms";
import { Router } from "@angular/router";
import { InsertPubService } from '../../../utils/insert-pub.service';

@Component({
	selector: "kt-add-insertion-media",
	templateUrl: "./add-insertion-media.component.html",
	styleUrls: ["./add-insertion-media.component.scss"]
})
export class AddInsertionMediaComponent implements OnInit {

	// ============================================================
	// Declarartion
	// ============================================================
	addForm: FormGroup;
	submitted = false;
	supports;
	loading = false;
	// ============================================================
	// Constructeur
	// ============================================================
	constructor(
		private service: InsertPubService,
		private router: Router,
		private formBuilder: FormBuilder
	) {}
	// ============================================================
	// ngOninit
	// ============================================================
	ngOnInit() {
		this.addForm = this.formBuilder.group({
			id: [],
			nom: ['', Validators.required],
			mail:['',Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
			contact: ['', Validators.required],
			tel: ['', Validators.compose([Validators.minLength(9), Validators.required])],
			site: ['', Validators.required],
			supportPublicitaire: ['', Validators.required],
		});

		this.getData();
	}
	// ============================================================
	// Charger les liste externe
	// ============================================================
	getData() {
		this.service.getData().subscribe(
			(data) => {
				this.supports = data[0];
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ============================================================
	// getter
	// ============================================================
	public getMail() {
		return this.addForm.get("email");
	}
	// ============================================================

	// ============================================================
	getErrorMessage() {
		return this.getMail().hasError("required")
			? "المرجو ادخال البريد الالكتروني"
			: this.getMail().hasError("email")
			? "البريد الالكتروني غير معتمد"
			: '';
	}

	onSubmit() {
		this.addMedia();
	}
	// ============================================================
	// add
	// ============================================================
	addMedia() {
		this.loading = true;
		this.submitted = true;
		if (this.addForm.invalid) {
			this.loading = false;
			return;
		}

		this.service
			.createObject("/MediaPublicitaires/new", this.addForm.value)
			.subscribe(
				data => {
					this.loading = false;
					this.router.navigate([
						"insertion-publicitaire/add-insertion-publicitaire"
					]);
				},
				error => {
					alert(error);
					this.loading = false;
				}
			);
	}
	// ============================================================
	// back button
	// ============================================================
	backList() {
		this.router.navigate([
			"insertion-publicitaire/list-insertion-publicitaire"
		]);
	}
	// ============================================================
	// Initialiser le formulaire
	// ============================================================
	onReset() {
		this.submitted = false;
		this.addForm.reset();
	}
	// ============================================================
	// field validation
	// ============================================================
	/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.addForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
