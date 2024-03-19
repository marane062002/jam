import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'kt-edit-delegataire',
  templateUrl: './edit-delegataire.component.html',
  styleUrls: ['./edit-delegataire.component.scss']
})
export class EditDelegataireComponent implements OnInit {
  baseUrl = environment.API_PROPRETE_URL
  id:any;
  form:any;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
    delegateForm = this.formBuilder.group({
		rc: ['', Validators.required],
		rs: ['', Validators.required],
		idf: ['', Validators.required],
		adresse: ['', Validators.required],
		tel: ['', Validators.required],
		secteurActive: ['', Validators.required],
		directeurGeneral: [''],
	});
  constructor(private router:Router,private formBuilder:FormBuilder ,private httpClient: HttpClient,private route: ActivatedRoute) { }
  
  ngOnInit() {
    this.id = this.route.snapshot.params["id"];
    this.httpClient.get<any[]>(`${this.baseUrl}delegataire/${this.id}`,{ headers: this.headers } ).subscribe((response: any) => {
			this.delegateForm.patchValue({ ...response });
			});
   
    
  }
   

  backList() {
		this.router.navigate(["/pages/proprete-personnel/list-personnel"]);
	}


  onSubmit() {
    if (this.delegateForm.valid) {
      this.httpClient.put<any[]>(`${this.baseUrl}delegataire/${this.id}`, this.delegateForm.value,{ headers: this.headers }).subscribe(
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
