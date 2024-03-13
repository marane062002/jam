import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import Swal from "sweetalert2";
@Component({
	selector: "kt-edit-centre",
	templateUrl: "./edit-centre.component.html",
	styleUrls: ["./edit-centre.component.scss"],
})
export class EditCentreComponent implements OnInit {
	id:any;
	centreTransfertForm: FormGroup;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	immatriculationCamionOptions =["54sM55","44dMsl","LMKL4566","45KJKJ"]
	adresseCTOptions = ["LKKJSII","54sM55","44dMsl","LMKL4566","45KJKJ"]
	constructor(private httpClient:HttpClient,private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder) {}


	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.centreTransfertForm = this.formBuilder.group({
			capacite: ['', Validators.required],
			localisation: ['', Validators.required],
			adresse: ['', Validators.required],
			immatriculationCamion: ['', Validators.required],
			quantite: ['', Validators.required],
			adressCT: ['', Validators.required],
			radio: ['']
		  });
		  this.httpClient.get<any[]>(`${this.baseUrl}centre/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.centreTransfertForm.patchValue({ ...res });
			console.log(this.centreTransfertForm.value)
		});
	}

	backList() {
		this.router.navigate(["/pages/proprete-transfert/centre-transfert"]);
	}

	onSubmit(){
		this.httpClient.put<any[]>(`${this.baseUrl}centre/${this.id}`,this.centreTransfertForm.value,{ headers: this.headers }).subscribe(
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
	}
}
