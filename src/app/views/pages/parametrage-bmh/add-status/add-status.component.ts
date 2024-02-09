import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from '../services/status.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterfaceStatus } from '../list-status/list-status.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.scss']
})
export class AddStatusComponent implements OnInit {

  constructor(private router:Router,private service:StatusService) { }

  status:InterfaceStatus;
  FormArtical:FormGroup;
  ngOnInit() {
    this.FormArtical=new FormGroup({
      id:new FormControl(''),
      libelle:new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
    })
      
    }
  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-status"]);
	}

  ajouter(){
    if(this.FormArtical.valid){
      this.service.create(this.FormArtical.value).subscribe(res=>{
        Swal.fire({
          title: 'Enregistrement réussi!',
          text: 'Type enregistré avec succès.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          this.FormArtical.reset();
          this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
        });
      },err=>{
        console.log(err);
        Swal.fire({
          title: 'Erreur!',
          text: 'Un problème est survenu lors de l\'enregistrement du type.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      })
    }
   
   
  }
}
