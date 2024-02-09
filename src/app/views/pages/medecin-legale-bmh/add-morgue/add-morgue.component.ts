import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { MorgueService } from "../services/morgue.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-add-morgue",
	templateUrl: "./add-morgue.component.html",
	styleUrls: ["./add-morgue.component.scss"],
})
export class AddMorgueComponent implements OnInit {
	ajoutForm: any;
	pcJointeFile: File;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	constructor(private httpClient: HttpClient,private router: Router, private formBuilder: FormBuilder, private service: MorgueService) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			numCasier: [""],
			numDeces: [""],
			status: [""],
		});
		// this.organismeService.getAll().subscribe(res=>{
		//   this.organisme=res
		//   console.log(res);
		//   console.log(this.organisme);
		// })
		// this.vehiculeService.getAll().subscribe(res=>{
		//   this.vehicule=res
		//   console.log(res);
		//   console.log(this.vehicule);
		// })
	}
	onPcJointeChange(event: any) {
		this.pcJointeFile = event.target.files[0];
	  }
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-morgue"]);
	}
	ajouter() {
		if (this.ajoutForm.valid) {
			const formData = new FormData();
			const pcJointe = new FormData();

			formData.append("morgue",new Blob([JSON.stringify(this.ajoutForm.value)],{type:'application/json'}))
			formData.append("pcj",this.pcJointeFile)
			this.service.create(formData).subscribe(
				(res:any) => {
					pcJointe.append('id',res.id)
					pcJointe.append("file", this.pcJointeFile)
					pcJointe.append("sousModule", "MORGUE")
					this.httpClient.post(`${this.AlfresscoURL}/bmh-morgue/multiplefile`, pcJointe)
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
