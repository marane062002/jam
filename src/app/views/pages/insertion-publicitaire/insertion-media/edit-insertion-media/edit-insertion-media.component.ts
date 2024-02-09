import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { InsertPubService } from '../../../utils/insert-pub.service';
import { Router } from '@angular/router';

@Component({
  selector: 'kt-edit-insertion-media',
  templateUrl: './edit-insertion-media.component.html',
  styleUrls: ['./edit-insertion-media.component.scss']
})
export class EditInsertionMediaComponent implements OnInit {

	// ============================================================
	// variable definition
	// ============================================================
	editForm: FormGroup;
	submitted = false;
	supports:any;
	loading = false;
	// ============================================================
	// Constructor
	// ============================================================
	constructor(
		private service: InsertPubService,
		private router: Router,
		private formBuilder: FormBuilder
	) {
		let ipId = window.localStorage.getItem("medId");
		this.editForm = this.formBuilder.group({
			id: [ipId],
			nom: ['', Validators.required],
			mail:['',Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
			contact: ['', Validators.required],
			tel: ['', Validators.compose([Validators.minLength(9), Validators.required])],
			site: ['', Validators.required],
			supportPublicitaire: this.formBuilder.group({
				id: ['', Validators.required],
			})
		});
		this.service
			.getObjectById("/MediaPublicitaires/show/", +ipId)
			.subscribe(data => {
				this.editForm.patchValue(data);
			});
	}
	// ============================================================
	// init data
	// ============================================================
	ngOnInit() {
		this.getData();
	}
	// ============================================================
	// Drop down list
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
	//
	// ============================================================
	public getMail() {
		return this.editForm.get("email");
	}
	// ============================================================
	//
	// ============================================================
	getErrorMessage() {
		return this.getMail().hasError("required")
			? "المرجو ادخال البريد الالكتروني"
			: this.getMail().hasError("email")
			? "البريد الالكتروني غير معتمد"
			: '';
	}
	// ============================================================
	//
	// ============================================================
	onSubmit() {
		this.addMedia();
	}
	// ============================================================
	// Update date
	// ============================================================
	addMedia() {
		this.loading = true;
		this.submitted = true;
		if (this.editForm.invalid) {
			this.loading = false;
			return;
		}
		this.service
			.createObject("/MediaPublicitaires/new", this.editForm.value)
			.subscribe(
				data => {
					this.loading = false;
					this.router.navigate(["insertion-media/list-insertion-media"]);
				},
				error => {
					alert(error);
					this.loading = false;
				}
			);
	}
	// ============================================================
	// Back list
	// ============================================================
	backList() {
		this.router.navigate(["insertion-media/list-insertion-media"]);
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
		const control = this.editForm.controls[controlName];
		if (!control) {
			return false;
		}
		const result =
			control.hasError(validationType) &&
			(control.dirty || control.touched);
		return result;
	}
}
