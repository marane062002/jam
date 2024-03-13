import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { environment } from "../../../../../../environments/environment";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Component({
  selector: 'kt-add-delegataire',
  templateUrl: './add-delegataire.component.html',
  styleUrls: ['./add-delegataire.component.scss']
})
export class AddDelegataireComponent implements OnInit {
  private baseUrl = environment.API_PROPRETE_URL; 
  delegateForm: FormGroup;
  private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
  constructor(private httpClient: HttpClient,private router:Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.delegateForm = this.formBuilder.group({
      rc: ['', Validators.required],
      rs: ['', Validators.required]
  });
  }
  backList() {
		this.router.navigate(["/pages/proprete-personnel/list-personnel"]);
	}
  onSubmit() {
    if (this.delegateForm.valid) {
      this.httpClient.post<any[]>(`${this.baseUrl}delegataire`, this.delegateForm.value,{ headers: this.headers }).subscribe(
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
