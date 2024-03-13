import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
@Component({
	selector: "kt-add-contrat",
	templateUrl: "./add-contrat.component.html",
	styleUrls: ["./add-contrat.component.scss"],
})
export class AddContratComponent implements OnInit {
	ajoutForm: FormGroup;
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}


	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			numContrat: ['', Validators.required],
			description: ['', Validators.required],
			intitule: ['', Validators.required],
			type: ['', Validators.required],
			dateDebut: ['', Validators.required],
			dateFin: ['', Validators.required],
		  });
	}
	pcjModel : File;
	modelPj(event: any) {
		this.pcjModel = event.target.files[0];
	}
	backList() {
		this.router.navigate(["/pages/proprete-contrats/list-contrats"]);
	}

	onSubmit(){
		if (this.ajoutForm.valid) {
			this.httpClient.post<any[]>(`${this.baseUrl}contrat`, this.ajoutForm.value,{ headers: this.headers }).subscribe(
					  (res:any) => {
						
						console.log("nouveau res :", res);
						
						const pcjMd = new FormData();
						pcjMd.append("file", this.pcjModel)
						pcjMd.append("sousModule", "CONTRAT")
						pcjMd.append("id",res.id)
						pcjMd.append("label", "P.J");
				
					  this.httpClient.post(`${this.AlfresscoURL}/contrat-proprete/multiplefile`, pcjMd)
					  .subscribe((res)=>{
					  })
				Swal.fire({
						  title: 'Enregistrement réussi!',
						  text: 'Enregistré avec succès.',
						  icon: 'success',
						  confirmButtonText: 'OK'
						}).then(() => {
						  this.backList();
						  this.ngOnInit(); 
						});
					  
					  (err) => {
						console.error(err);
						Swal.fire({
						  title: 'Erreur!',
						  text: 'Un problème est survenu lors de l\'enregistrement du Constateur.',
						  icon: 'error',
						  confirmButtonText: 'OK'
						});
					  }
					  });
		  }
	}
}
