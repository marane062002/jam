import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../../../../environments/environment";
@Component({
	selector: "kt-add-circuit",
	templateUrl: "./add-circuit.component.html",
	styleUrls: ["./add-circuit.component.scss"],
})
export class AddCircuitComponent implements OnInit {
	ajoutForm: FormGroup;
	structure: any[] = [];
	private AlfresscoURL = environment.API_ALFRESCO_URL;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.ajoutForm = this.formBuilder.group({
			designation: ['', Validators.required],
			densite: ['', Validators.required],
			quartier: ['', Validators.required],
			zone: ['', Validators.required],
		  });
	}

	backList() {
		this.router.navigate(["/pages/proprete-circuit/list-circuit"]);
	}
	pcjModel : File;
	modelPj(event: any) {
		this.pcjModel = event.target.files[0];
	}
	submit(){
		if (this.ajoutForm.valid) {
			this.httpClient.post<any[]>(`${this.baseUrl}circuit`, this.ajoutForm.value,{ headers: this.headers }).subscribe(
					  (res:any) => {
						const pcjMd = new FormData();
						console.log("nouveau res :", res);
						pcjMd.append("file", this.pcjModel)
						pcjMd.append("sousModule", "PROPRETE")
						pcjMd.append("id",res.id)
						pcjMd.append("label", "CIRCUIT");
				
					  this.httpClient.post(`${this.AlfresscoURL}/circuit-proprete/multiplefile`, pcjMd)
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
