import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CadavreService } from "../services/cadavre.service";
import Swal from "sweetalert2";
import { InterfaceObstacle } from "../list-obstacles/list-obstacles.component";
import { ObstacleDefuntsService } from "../services/obstacle-defunts.service";
import { ObstacleService } from "../services/obstacle.service";
import { FourgonService } from "../services/fourgon.service";
import { InterfaceFourgon } from "../list-fourgon/list-fourgon.component";
import { ConducteurService } from "../../parametrage-bmh/services/conducteur.service";
import { InterfaceConducteur } from "../../parametrage-bmh/list-conducteur/list-conducteur.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
@Component({
	selector: "kt-add-cadavre",
	templateUrl: "./add-cadavre.component.html",
	styleUrls: ["./add-cadavre.component.scss"],
})
export class AddCadavreComponent implements OnInit {
	conducteur: InterfaceConducteur[] = [];
	fourgon: InterfaceFourgon[] = [];
	info: any;
	id: any;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	obstacleDefunts: InterfaceObstacle[] = [];
	ajoutForm: any;
	constructor(private httpClient : HttpClient, private conducteurService: ConducteurService, private serviceFourgon: FourgonService, private serviceObstacle: ObstacleService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder, private service: CadavreService, private serviceObstacleDefunts: ObstacleService) {}
	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = params.id;

			this.serviceObstacle.getById(this.id).subscribe(
				(data: any) => {
					this.info = data; // Stocker les informations récupérées dans la variable 'info'

					this.info.value;
					this.ajoutForm.patchValue({
						obstacleDefunts: this.info.obstacle, // Supposons que 'obstacle' est l'attribut dans 'Cadavre' contenant l'objet 'Obstacle'
					});
				},
				(error: any) => {
					console.error("Erreur lors de la récupération des données :", error);
				}
			);
		});
		
		this.ajoutForm = this.formBuilder.group({
			// id: [null], // Exemple de champ non modifiable
			// numDeces: [""],
			date: [""],
			nom: [""],
			prenom: [""],
			cin: [""],
			tel: [""],
			obstacleDefunts: [""],
			observation: [""],
			fourgon: [""],
			conducteurObstacle: [""],
			conducteur: [""],
			statut: [""],
			autorizationProcureur: [""],
		});

		this.serviceFourgon.getAll().subscribe((res) => {
			this.fourgon = res;
			console.log(this.fourgon);
		});
		this.conducteurService.getAll().subscribe((res) => {
			this.conducteur = res;
			console.log(this.conducteur);
		});
	}


	    pcjModel : File;
		pcjStatut : File;
		modelPj(event: any) {
			this.pcjModel = event.target.files[0];
		}
		statutPj(event: any) {
			this.pcjStatut = event.target.files[0];
		}


	RetourEmbalages() {
		this.router.navigate(["/bmh1/details-obstacles/", this.id]);
	}
	transfert() {
		this.router.navigate(["/bmh1/add-transfert/", this.id]);
	}
	enterrement() {
		this.router.navigate(["/bmh1/add-enterementInhum", this.id]);
	}

	ajouter() {
		if (this.ajoutForm.valid) {
			this.service.create(this.ajoutForm.value).subscribe(
				(res:any) => {
					const pcjMd = new FormData();
					const pcjStt = new FormData();

					pcjStt.append("file", this.pcjStatut)
					pcjStt.append("sousModule", "CADAVRE")
					pcjStt.append("id",res.id)
					pcjStt.append("label", "PJ");
			  
					this.httpClient.post(`${this.AlfresscoURL}/cadavre-bmh/multiplefile`, pcjStt)
					.subscribe((res)=>{
					})


					pcjMd.append("file", this.pcjModel)
					pcjMd.append("sousModule", "CADAVRE")
					pcjMd.append("id",res.id)
					pcjMd.append("label", "PJ");
			
				  this.httpClient.post(`${this.AlfresscoURL}/cadavre-bmh/multiplefile`, pcjMd)
				  .subscribe((res)=>{
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
