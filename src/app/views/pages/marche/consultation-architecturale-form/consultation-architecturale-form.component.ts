import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConsultationArchitecturalService } from "../../shared/consultation-architectural.service";
import { ConsultationArchitecturale } from "../models/consultation-architecturale";

@Component({
	selector: "kt-consultation-architecturale-form",
	templateUrl: "./consultation-architecturale-form.component.html",
	styleUrls: ["./consultation-architecturale-form.component.scss"],
})
export class ConsultationArchitecturaleFormComponent implements OnInit {
	formGroup: FormGroup;
	form: any;
	constructor(
		private fb: FormBuilder,
		private service: ConsultationArchitecturalService,
		private route: Router
	) {
		this.formGroup = this.fb.group({
			numCA: [{ value: "" }, [Validators.required]],
			objetFR: [{ value: "" }, [Validators.required]],
			objetAR: [{ value: "" }, [Validators.required]],
			budget: [{ value: "" }, [Validators.required]],
			type: [{ value: "" }, []],
			loi: [{ value: "" }, []],
			isValideDg: [{ value: "" }, []],
			isValideTresorerie: [{ value: "" }, []],
			isValideSG: [{ value: "" }, []],
			listArchitectes: [{ value: "" }, []],
			listJournaux: [{ value: "" }, []],
		});
	}

	consultationArchitecturale: ConsultationArchitecturale;

	ngOnInit() {
		this.form = {
			id: null,
			numCA: "",
			objetFR: "",
			objetAR: "",
			budget: null,
			type: "",
			date: null,
			loi: null,
			isValideDg: null,
			isValideTresorerie: null,
			isValideSG: null,
			listArchitectes: [],
			listJournaux: [],
		};
	}

	back() {
		this.route.navigate(["//marches/consultation-architecturale"]);
	}

	onSubmit() {
		this.consultationArchitecturale = {
			id: null,
			numCA: this.form.numCA,
			objetFR: this.form.objetFR,
			objetAR: this.form.objetAR,
			budget: this.form.budget,
			type: this.form.type,
			loi: this.form.loi,
			isValideDg: null,
			date: this.form.date,
			isValideTresorerie: null,
			isValideSG: null,
			listArchitectes: null,
			listJournaux: null,
		};
		this.service
			.addConsultation(this.consultationArchitecturale)
			.subscribe((res) => {
				this.route.navigate(["/marches/consultation-architecturale"]);
			});
	}

	onChangeType($event) {
		this.form.type = $event.value;
	}

	onChangeLoi($event) {
		this.form.loi = $event.value;
	}
}
