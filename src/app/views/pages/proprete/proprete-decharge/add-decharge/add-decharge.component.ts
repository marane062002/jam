import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import Swal from "sweetalert2";
@Component({
	selector: "kt-add-decharge",
	templateUrl: "./add-decharge.component.html",
	styleUrls: ["./add-decharge.component.scss"],
})
export class AddDechargeComponent implements OnInit {
	ajoutForm: FormGroup;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}



	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			immatriculationCamion: ['', Validators.required],
			capacite: ['', Validators.required],
			adresseCT: ['', Validators.required],
			tonnage: ['', Validators.required]
		  });
	}

	backList() {
		this.router.navigate(["/pages/proprete-decharge/list-decharge"]);
	}

	onSubmit(){
		
		if (this.ajoutForm.valid) {
			
			this.httpClient.post<any[]>(`${this.baseUrl}decharge`, this.ajoutForm.value,{ headers: this.headers }).subscribe(
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
