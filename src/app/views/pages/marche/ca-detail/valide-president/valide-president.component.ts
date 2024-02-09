import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ConsultationArchitecturalService } from "../../../shared/consultation-architectural.service";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { ConsultationArchitecturale } from "../../models/consultation-architecturale";

@Component({
	selector: "kt-valide-president",
	templateUrl: "./valide-president.component.html",
	styleUrls: ["./valide-president.component.scss"],
})
export class ValidePresidentComponent implements OnInit {
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
			notePresident: "",
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

	valideParPresident() {
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
				let motif =
					this.noteForm.notePresident != ""
						? this.noteForm.notePresident
						: "pas d'observation";
				this.service.valideParPresident(this.idCA, motif).subscribe(
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
