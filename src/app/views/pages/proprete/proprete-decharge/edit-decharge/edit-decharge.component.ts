import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../../../../../environments/environment";
import Swal from "sweetalert2";
@Component({
	selector: "kt-edit-decharge",
	templateUrl: "./edit-decharge.component.html",
	styleUrls: ["./edit-decharge.component.scss"],
})
export class EditDechargeComponent implements OnInit {
	ajoutForm:any;
	id:any;
	baseUrl = environment.API_PROPRETE_URL
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private httpClient:HttpClient,private route:ActivatedRoute,private router: Router, private formBuilder: FormBuilder) {}


	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.ajoutForm = this.formBuilder.group({
			immatriculationCamion: ['', Validators.required],
			capacite: ['', Validators.required],
			adresseCT: ['', Validators.required],
			tonnage: ['', Validators.required]
		  });
		  this.httpClient.get<any[]>(`${this.baseUrl}decharge/${this.id}`,{ headers: this.headers } ).subscribe((res: any) => {
			this.ajoutForm.patchValue({ ...res });
			console.log(this.ajoutForm.value)
		});
	}

	backList() {
		this.router.navigate(["/pages/proprete-decharge/list-decharge"]);
	}


	onSubmit(){
		this.httpClient.put<any[]>(`${this.baseUrl}decharge/${this.id}`,this.ajoutForm.value,{ headers: this.headers }).subscribe(
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

}
