import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { ConsultationArchitecturalService } from "../../../shared/consultation-architectural.service";
import { ConsultationArchitecturale } from "../../models/consultation-architecturale";

@Component({
	selector: "kt-valide-tresorier",
	templateUrl: "./valide-tresorier.component.html",
	styleUrls: ["./valide-tresorier.component.scss"],
})
export class ValideTresorierComponent implements OnInit {
	idCA: any;
	noteForm: any;
	consultationArchitecturale: ConsultationArchitecturale;
	constructor(
		private translate: TranslateService,
		private service: ConsultationArchitecturalService,
		private activatedRoute: ActivatedRoute
	) {}

	ngOnInit() {
		this.noteForm = {
			noteTreroserie: "",
		};
		this.consultationArchitecturale = {
			isValideDg: null,
			isValideSG: null,
			isValideTresorerie: null,
		};
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idCA = params["id"];
		});
		console.log(this.idCA);
		this.loadCA();
	}
	loadCA() {
		this.service.getConsultationBYId(this.idCA).subscribe((res) => {
			this.consultationArchitecturale = JSON.parse(res + "");
		});
	}

	valideParTresorier() {
		Swal.fire({
			title: this.translate.instant("PAGES.GENERAL.MSG_VALIDATION"),
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				let motif= this.noteForm.noteTreroserie!=""?this.noteForm.noteTreroserie:"pas d'observation";
				this.service
					.valideParTresorier(this.idCA,motif)
					.subscribe(
						(data) => {
							Swal.fire({
								position: "center",
								icon: "success",
								title: this.translate.instant(
									"PAGES.GENERAL.MSG_VALIDATION_CONFIRMED"
								),
								showConfirmButton: false,
								timer: 1500,
							});
							this.loadCA();
						},
						(err) => {
							console.log(err);
							/*Swal.fire({
							icon: "error",
							title: "Suppression interdite !!",
							text: "Ce numéro d'appel d'offres est utilisé par d'outre module.",
						});*/
						}
					);
			}
		});
	}
}
