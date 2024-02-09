import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { FourgonService } from "../services/fourgon.service";
import { OrganismeService } from "../services/organisme.service";
import { InterfaceOrganisme } from "../list-organisme/list-organisme.component";
import { InterfaceVehicule } from "../../parametrage-bmh/list-vehicule/list-vehicule.component";
import { VehiculeService } from "../../parametrage-bmh/services/vehicule.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-add-fourgon",
	templateUrl: "./add-fourgon.component.html",
	styleUrls: ["./add-fourgon.component.scss"],
})
export class AddFourgonComponent implements OnInit {
	organisme: InterfaceOrganisme[] = [];
	vehicule: InterfaceVehicule[] = [];
	pcJFile:File;
	ajoutForm: any;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private httpClient: HttpClient,private router: Router, private formBuilder: FormBuilder, private service: FourgonService, private organismeService: OrganismeService, private vehiculeService: VehiculeService) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			matricule: [""],
			couleur: [""],
			vehicule: [""],
			organisme: [""],
		});
		this.organismeService.getAll().subscribe((res) => {
			this.organisme = res;
			console.log(res);
			console.log(this.organisme);
		});
		this.vehiculeService.getAll().subscribe((res) => {
			this.vehicule = res;
			console.log(res);
			console.log(this.vehicule);
		});
	}
	onPcJChange(event:any){
		this.pcJFile = event.target.files[0];
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-fourgon/"]);
	}
	ajouter() {
		if (this.ajoutForm.valid) {
			const formData = new FormData();
			const pcj = new FormData();
			formData.append("fourgon", new Blob([JSON.stringify(this.ajoutForm.value)],{ type: 'application/json' }))
			formData.append("pcj",this.pcJFile)
			this.service.create(formData).subscribe(
				(res:any) => {
					// debugger
					console.log(res);
					// debugger
				    pcj.append("file", this.pcJFile)
					pcj.append("id", res.id)
					pcj.append("sousModule","FOURGON")
					// debugger
					this.httpClient.post(`${this.AlfresscoURL}/bmh-fourgon/multiplefile`, pcj)
					.subscribe((res)=>{
						console.log('Piece Jointe stored successfully:', res);
					})
					// debugger
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Constateur enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.RetourEmbalages();
						this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
					});
				},
				(err) => {
					console.error(err);
					Swal.fire({
						title: "Erreur!",
						text: "Un problème est survenu lors de l'enregistrement du Constateur.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		}
	}
}
