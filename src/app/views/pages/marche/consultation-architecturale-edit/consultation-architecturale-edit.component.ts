import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConsultationArchitecturalService } from "../../shared/consultation-architectural.service";
import { ConsultationArchitecturale } from "../models/consultation-architecturale";

@Component({
	selector: "kt-consultation-architecturale-edit",
	templateUrl: "./consultation-architecturale-edit.component.html",
	styleUrls: ["./consultation-architecturale-edit.component.scss"],
})
export class ConsultationArchitecturaleEditComponent implements OnInit {
	idCA: any;
	consultationArchitecturale: ConsultationArchitecturale;
	constructor(
		private fb: FormBuilder,
		private service: ConsultationArchitecturalService,
		private route: Router,
		private activatedRoute: ActivatedRoute
	) {
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
	form: any;
	ngOnInit() {
		this.activatedRoute.paramMap.subscribe((param) => {
			this.idCA = param.get("id");
			if (this.idCA == null || this.idCA == "") {
				this.route.navigateByUrl(
					"/marches/consultation-architecturale"
				);
			} else {
				this.loadConsulationArchitecturale(this.idCA);
			}
		});
	}
	loadConsulationArchitecturale(idCA: any) {
		this.service.getConsultationBYId(idCA).subscribe((res) => {
			this.form = JSON.parse(res + "");
			this.form.date = this.formatDate(this.form.date);
			console.log(this.form.date);
		});
	}

	onSubmit() {
		this.consultationArchitecturale = {
			id: this.form.id,
			numCA: this.form.numCA,
			objetFR: this.form.objetFR,
			objetAR: this.form.objetAR,
			budget: this.form.budget,
			type: this.form.type,
			date: this.form.date,
			loi: this.form.loi,
			isValideDg: null,
			isValideTresorerie: null,
			isValideSG: null,
			listArchitectes: null,
			listJournaux: null,
		};
		this.service
			.editerConsultation(this.consultationArchitecturale)
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

	back() {
		this.route.navigate(["/marches/consultation-architecturale"]);
	}

	formatDate(date) {
		var d = new Date(date),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();

		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;

		return [year, month, day].join("-");
	}
}
