import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
@Component({
	selector: "kt-add-centre",
	templateUrl: "./add-centre.component.html",
	styleUrls: ["./add-centre.component.scss"],
})
export class AddCentreComponent implements OnInit {
	centreTransfertForm: FormGroup;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	immatriculationCamionOptions =["54sM55","44dMsl","LMKL4566","45KJKJ"]
	adresseCTOptions = ["LKKJSII","54sM55","44dMsl","LMKL4566","45KJKJ"]
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}



	ngOnInit() {
		this.centreTransfertForm = this.formBuilder.group({
			capacite: ['', Validators.required],
			localisation: ['', Validators.required],
			adresse: ['', Validators.required],
			immatriculationCamion: ['', Validators.required],
			quantite: ['', Validators.required],
			adressCT: ['', Validators.required],
			radio: ['']
		  }); 
	}

	backList() {
		this.router.navigate(["/pages/proprete-transfert/centre-transfert"]);
	}
	onSubmit(){
		if (this.centreTransfertForm.valid) {
			this.httpClient.post<any[]>(`${this.baseUrl}centre`, this.centreTransfertForm.value,{ headers: this.headers }).subscribe(
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
					  });
		  }
	}
}
