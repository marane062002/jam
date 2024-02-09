import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import { EquipeService } from "../services/equipe.service";
import { Router } from "@angular/router";

@Component({
	selector: "kt-list-equipe",
	templateUrl: "./list-equipe.component.html",
	styleUrls: ["./list-equipe.component.scss"],
})
export class ListEquipeComponent implements OnInit {
	constructor(private service: EquipeService, private router: Router) {}

	equipe: InterfaceEquipe[] = [];
	displayedColumns = ["Id", "Nom", "Prenom", "CIN", "TEL", "actions"];
	ngOnInit() {
		// this.getAllC();

		this.service.getAll().subscribe((res) => {
			this.equipe = res;
			console.log(res);
		});
	}
	// getAllC(){
	//   this.service.getAll().subscribe(res=>
	//     {
	//       this.equipe=res;
	//     })
	// }

	addConducteur() {
		this.router.navigate(["/bmh/add-equipe"]);
	}

	DetailConducteur(id: any) {
		this.router.navigate(["/bmh/details-equipe/", id]);
	}

	ModifierConducteur(id: any) {
		this.router.navigate(["/bmh/update-equipe/", id]);
	}
	delete(id: any) {
		Swal.fire({
			title: " ",
			text: "voulez-vous vraiment supprimer ce  entrées de stock  ?",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Supprimer",
			cancelButtonText: "Fermer",
		}).then((result) => {
			if (result.isConfirmed) {
				this.service.delete(id).subscribe(
					(res) => {
						this.ngOnInit();
						Swal.fire({
							title: "entrées de stock à été   supprimé avec succès !",
							icon: "success",
						});
					},
					(err) => {
						console.log(err);
					}
				);
			}
		});
	}
}
export interface InterfaceEquipe {
	id: number;
	nom: string;
	prenom: string;
	cin: string;
	tel: string;
}
