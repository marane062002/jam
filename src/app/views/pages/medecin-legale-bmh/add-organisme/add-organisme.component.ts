import { Component, OnInit } from "@angular/core";
import { InterfaceType } from "../../parametrage-bmh/list-types/list-types.component";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { OrganismeService } from "../services/organisme.service";
import { TypeServiceService } from "../../../pages/parametrage-bmh/services/type-service.service";
import Swal from "sweetalert2";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-add-organisme",
	templateUrl: "./add-organisme.component.html",
	styleUrls: ["./add-organisme.component.scss"],
})
export class AddOrganismeComponent implements OnInit {
	type: InterfaceType[] = [];
	ajoutForm: any;
	pcJointeFile: File;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private httpClient: HttpClient,private router: Router, private formBuilder: FormBuilder, private service: OrganismeService, private typeService: TypeServiceService) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			raisonSociale: [""],
			rc: [""],
			ice: [""],
			adresse: [""],
			iff: [""],
			tel: [""],
			type: [""],
		});
		this.typeService.getAllTypes().subscribe((res) => {
			this.type = res;
			console.log(res);
			console.log(this.type);
		});
	}
	onPcJointeChange(event: any) {
		this.pcJointeFile = event.target.files[0];
	  }
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-organisme"]);
	}
	ajouter() {
		if (this.ajoutForm.valid) {
			const pcJointe = new FormData();
			pcJointe.append("file", this.pcJointeFile)
			pcJointe.append("sousModule", "ORGANISME")
			this.service.create(this.ajoutForm.value).subscribe(
				(res:any) => {
					pcJointe.append('id',res.id)
					this.httpClient.post(`${this.AlfresscoURL}/bmh-organisme/multiplefile`, pcJointe)
						.subscribe((res)=>{
								console.log('Piece Jointe stored successfully:', res);
					})
					console.log(res);
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
