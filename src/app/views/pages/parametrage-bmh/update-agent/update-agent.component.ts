import { Component, OnInit } from '@angular/core';
import { AgentService } from '../services/agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-update-agent',
  templateUrl: './update-agent.component.html',
  styleUrls: ['./update-agent.component.scss']
})
export class UpdateAgentComponent implements OnInit {

  constructor(private router:Router,private service:AgentService ,private route:ActivatedRoute) { }

  id:any;
  FormArticale =new FormGroup({
    id:new FormControl(''),
    nom: new FormControl('',Validators.required),
    prenom: new FormControl('',Validators.required),
    cin: new FormControl('',Validators.required),
    tel: new FormControl('',Validators.required),
    
  })
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.service.getById(id).subscribe(res=>{
      this.FormArticale.patchValue({...res});
      this.FormArticale.value 
    },(err)=>{
      console.log(err)
    });   

  }
  RetourEmbalages(): void {
		this.router.navigate(["bmh/list-agent"]);
	}
  update(){
    if(this.FormArticale.valid){
      this.service.update(this.FormArticale.value.id,this.FormArticale.value).subscribe(
        (res) => {
          console.log(res);
          Swal.fire({
            title: 'Enregistrement réussi!',
            text: 'Constateur enregistré avec succès.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.FormArticale.reset();
            this.ngOnInit(); // Vous pouvez recharger les données si nécessaire ici
          });
        },
        (err) => {
          console.error(err);
          Swal.fire({
            title: 'Erreur!',
            text: 'Un problème est survenu lors de l\'enregistrement du constateur.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
      }else{
        console.log('le formulaire est invalide');
      }
    }  

}
