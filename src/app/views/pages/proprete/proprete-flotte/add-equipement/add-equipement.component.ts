import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import Swal from "sweetalert2";
@Component({
	selector: "kt-add-equipement",
	templateUrl: "./add-equipement.component.html",
	styleUrls: ["./add-equipement.component.scss"],
})
export class AddEquipementComponent implements OnInit {
	ajoutForm: any;
	delegataire:any;

	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	private baseUrl = environment.API_PROPRETE_URL;
	constructor(private router: Router,private httpClient : HttpClient,private formBuilder:FormBuilder) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			type: ['', Validators.required],
			immatriculation: ['', Validators.required],
			designation: ['', Validators.required],
			capacite: ['', Validators.required],
			etat: ['', Validators.required],
			commentaire: [''],
			operationnel: ['', Validators.required],
			localisation: [''] ,
			delegataire: ['']
		  });
		  this.httpClient.get<any[]>(`${this.baseUrl}delegataire`,{ headers: this.headers }).subscribe(
			(res:any) => {
			  this.delegataire = res
			  console.log("nouveau res :", res);
			}
		  )
	}

 
	ajouter(){
		this.httpClient.post<any[]>(`${this.baseUrl}equipement`,this.ajoutForm.value,{ headers: this.headers }).subscribe(
			(res:any) => {
			  console.log("nouveau res :", res);
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
			}
		  )
		console.log(this.ajoutForm.value)
	}

	backList() {
		this.router.navigate(["/pages/proprete-flotte/list-flotte"]);
	}
}
