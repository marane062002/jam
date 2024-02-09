import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import Swal from "sweetalert2";
import { DisponibiliteFondsService } from "../../shared/disponibilite-fonds.service";
import { TranslateService } from "@ngx-translate/core";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-disponibilite-fonds",
	templateUrl: "./disponibilite-fonds.component.html",
	styleUrls: ["./disponibilite-fonds.component.scss"],
})
export class DisponibiliteFondsComponent implements OnInit {
	Form: FormGroup;

	constructor(private datePipe: DatePipe, private translateService: TranslateService, private disponibiliteFondsService: DisponibiliteFondsService) {
		this.Form = new FormGroup({
			montant: new FormControl("", [Validators.required]),
		});
	}
	chartType2 = "line";
	lib = [];
	id = [];
	loading = false;

	ngOnInit() {
		this.disponibiliteFondsService.getDisponibiliteFonds().subscribe((res) => {
			for (let i = 0; i < res.body.length; i++) {
				;

				let creationDate = this.datePipe.transform(res.body[i].creationDate, "yyyy-MM-dd HH:mm");
				this.lib.push(creationDate);
				this.id.push(res.body[i].montant);
				;
			}
			console.log(res);
			;
			if (res.body.length != 0) {
				this.Form.patchValue({
					montant: res.body[res.body.length - 1].montant,
				});
			}
			;
			this.chartOptionPie(this.lib, this.id, this.chartType2);
		});
	}
	onEdit() {
		if (this.Form.valid) {
			const partsData = this.Form.value;
			;
			this.loading = true;

			this.disponibiliteFondsService.saveDisponibiliteFonds(partsData).subscribe(
				(response) => {
					Swal.fire({
						position: "center",
						icon: "success",
						title: "Les parts ont été modifiées avec succès",
						showConfirmButton: false,
						timer: 2500,
					});
					this.lib = [];
					this.id = [];
					this.ngOnInit();
				},
				(error) => {
					Swal.fire({
						position: "center",
						icon: "error",
						title: "Erreur de modification",
						showConfirmButton: false,
						timer: 2500,
					});
				}
			);
		}
	}

	dash1;
	dash2;
	chartOptionPie(libelle, id, type) {
		var ctx = document.getElementById("canvas1");
	
		this.dash2 = new Chart(ctx, {
			type: type,
			data: {
				labels: libelle, 
				datasets: [
					{
						 label: 'Disponibilité des fonds',
						data: id,
						backgroundColor: libelle.map((label) => 'yellow'),
						borderWidth: 0,
						fill: true,
					},
				],
			},
			options: {
				legend: {
					display: true,
				},
			},
		});
	}
}
