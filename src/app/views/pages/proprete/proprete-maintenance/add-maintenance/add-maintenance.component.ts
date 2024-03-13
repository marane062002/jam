import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { environment } from "../../../../../../environments/environment";
@Component({
	selector: "kt-add-maintenance",
	templateUrl: "./add-maintenance.component.html",
	styleUrls: ["./add-maintenance.component.scss"],
})
export class AddMaintenanceComponent implements OnInit {
	maintenanceForm: FormGroup;
	private baseUrl = environment.API_PROPRETE_URL; 
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	constructor(private router: Router,private httpClient:HttpClient,private formBuilder: FormBuilder) {}


	ngOnInit() {
		this.maintenanceForm = this.formBuilder.group({
			typeEqipement: ['', Validators.required],
			maintenance: ['', Validators.required],
			designation: ['', Validators.required],
			typeMaintenance: ['', Validators.required],
			dateMaintenance: ['', Validators.required],
			revision: ['', Validators.required],
			typeRevision: ['', Validators.required],
			dateRevision: ['', Validators.required]
		  });
	}

	backList() {
		this.router.navigate(["/pages/proprete-maintenance/list-maintenance"]);
	}
	onSubmit(){
	
		if (this.maintenanceForm.valid) {
			
			this.httpClient.post<any[]>(`${this.baseUrl}maintenance`, this.maintenanceForm.value,{ headers: this.headers }).subscribe(
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
