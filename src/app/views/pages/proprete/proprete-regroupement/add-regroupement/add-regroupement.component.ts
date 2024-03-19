import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import Swal from "sweetalert2";
@Component({
	selector: "kt-add-regroupement",
	templateUrl: "./add-regroupement.component.html",
	styleUrls: ["./add-regroupement.component.scss"],
})
export class AddRegroupementComponent implements OnInit {
	pointRegroupementForm:FormGroup;
	equipement:any;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}


	ngOnInit() {
		this.pointRegroupementForm = this.formBuilder.group({
			ref: ['', Validators.required],
			localisation: ['', Validators.required],
			adresse: ['', Validators.required],
			equipement: ['', Validators.required]
		  });
		  this.httpClient.get<any[]>(`${this.baseUrl}equipement`,{ headers: this.headers }).subscribe(
			(res:any) => {
			  this.equipement = res
			  console.log("nouveau res :", res);
			}
		  )
	}

	backList() {
		this.router.navigate([
			"/pages/proprete-regroupement/list-regroupement",
		]);
	}
	onSubmit(){
		
		if (this.pointRegroupementForm.valid) {
			
			this.httpClient.post<any[]>(`${this.baseUrl}regroupement`, this.pointRegroupementForm.value,{ headers: this.headers }).subscribe(
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
