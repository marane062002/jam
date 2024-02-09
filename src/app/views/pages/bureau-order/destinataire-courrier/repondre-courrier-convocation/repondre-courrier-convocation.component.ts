import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BoServiceService } from '../../../utils/bo-service.service';
import { MatRadioChange } from '@angular/material';
import { Router } from '@angular/router';

interface destinataires {
	libelle: string;
}

@Component({
	selector: 'kt-repondre-courrier-convocation',
	templateUrl: './repondre-courrier-convocation.component.html',
	styleUrls: ['./repondre-courrier-convocation.component.scss']
})
export class RepondreCourrierConvocationComponent implements OnInit {


	courrier_convocation_id: any;
	dest_courr_conv_id: any;
	courrier_conv_dispatchingDate: any;

	loading = false;
	courrierId: number;
	submitted = false;
	partenaires: any;
	divisions: any;
	services: any;
	personnels: any;
	answerForm: FormGroup;
	selectedList: string;
	organigramme = true;
	autre = false;
	nature: string;
	@Output() valueChange: EventEmitter<any> = new EventEmitter<any>();
	@Output() change: EventEmitter<MatRadioChange>;
	listDestinataire: destinataires[];

	constructor(
		private service: BoServiceService,
		private router: Router,
		private fb: FormBuilder,
	) {
	}
	isNotModified: boolean = false;
	isRappelConvocation: boolean = false;
	ngOnInit() {
		this.formBuild();
		this.courrier_convocation_id = parseInt(window.localStorage.getItem("courrier_conv_id"));
		this.courrier_conv_dispatchingDate = window.localStorage.getItem("courrier_conv_dispatchingDate");
		this.service
			.getAllObjectById("/destinataireCourriersConvocations/find/", this.courrier_convocation_id)
			.subscribe(
				(data) => {
					for (let i = 0; i < data.length; i++) {
						if (data[i].statutConvocation != 'EN_ATTENTE_REPONSE' || data[i].motif != null) {
							this.isNotModified = true;
							this.answerForm.get('statutConvocation').setValue(data[i].statutConvocation);
							this.answerForm.get('motif').setValue(data[i].motif);
						}
						const daysBetween = this.calculateDaysBetweenDates(this.courrier_conv_dispatchingDate, this.formatDateToISO8601(new Date()));
						console.log('days between two dates: ' + daysBetween);
						if (data[i].statutConvocation == 'EN_ATTENTE_REPONSE' && data[i].motif == null && daysBetween > 3) {
							this.isRappelConvocation = true;
						}
						if (data[i].division != null) {
							this.dest_courr_conv_id = data[i].id;
						}
					}
				}
			);

	}

	calculateDaysBetweenDates(date1, date2) {
		return Math.floor((new Date(date2.split("T")[0]).getTime() - new Date(date1.split("T")[0]).getTime()) / (1000 * 60 * 60 * 24));
	}

	padZero(number) {
		return number.toString().padStart(2, '0');
	}

	formatDateToISO8601(inputDateStr): any {
		let inputDate = new Date(inputDateStr);
		const year = inputDate.getUTCFullYear();
		const month = this.padZero(inputDate.getUTCMonth() + 1);
		const day = this.padZero(inputDate.getUTCDate());
		const hours = this.padZero(inputDate.getUTCHours());
		const minutes = this.padZero(inputDate.getUTCMinutes());
		const seconds = this.padZero(inputDate.getUTCSeconds());
		const milliseconds = inputDate.getUTCMilliseconds();
		const timezoneOffset = inputDate.getTimezoneOffset();
		const timezoneOffsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
		const timezoneOffsetMinutes = Math.abs(timezoneOffset) % 60;
		const timezoneSign = timezoneOffset >= 0 ? '-' : '+';
		return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}${timezoneSign}${this.padZero(timezoneOffsetHours)}${this.padZero(timezoneOffsetMinutes)}`;
	}

	formBuild() {
		this.answerForm = this.fb.group({
			statutConvocation: [null],
			motif: [null],
			id: [this.dest_courr_conv_id]
		});
	}

	onSubmit() {
		this.repondreCourrierConv();
	}

	repondreCourrierConv() {
		let idPers = parseInt(localStorage.getItem("idPers"));
		let idDiv = parseInt(localStorage.getItem("idDiv"));
		this.submitted = true;
		if (this.answerForm.invalid) {
			return;
		}
		this.loading = true;
		this.answerForm.value.id = this.dest_courr_conv_id;
		this.service
			.updateObject("/destinataireCourriersConvocations/repondreCourrierConv/", this.answerForm.value)
			.subscribe((data) => {
				this.router.navigate(["personnel-courriers/show-courriers"], { queryParams: { id: idPers, div: idDiv } });
			});
	}

	backList() {
		let idPers = parseInt(localStorage.getItem("idPers"));
		let idDiv = parseInt(localStorage.getItem("idDiv"));
		this.router.navigate(["personnel-courriers/show-courriers"], { queryParams: { id: idPers, div: idDiv } });
	}

	onReset() {
		this.submitted = false;
		this.answerForm.reset();
	}

	onStatutConvocationChange(event) {
		this.answerForm.value.statutConvocation = event.value;
	}

	downloadConvocationReunionCommission() {
		let idPers = parseInt(localStorage.getItem("idPers"));
		let idDiv = parseInt(localStorage.getItem("idDiv"));
		this.service
			.PrintGenerator2(this.dest_courr_conv_id, idPers)
			.subscribe((res: any) => {
				const blob = new Blob([res], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			});
	}

	downloadRappelConvocationReunionCommission() {
		let idPers = parseInt(localStorage.getItem("idPers"));
		let idDiv = parseInt(localStorage.getItem("idDiv"));
		this.service
			.PrintGenerator3(this.dest_courr_conv_id, idPers)
			.subscribe((res: any) => {
				const blob = new Blob([res], { type: 'application/pdf' });
				const url = window.URL.createObjectURL(blob);
				window.open(url);
			});
	}
}
