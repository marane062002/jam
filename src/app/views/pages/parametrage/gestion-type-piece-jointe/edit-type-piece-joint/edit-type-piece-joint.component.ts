import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionTypePieceJointService } from '../../Services/gestion-type-piece-joint.service';

@Component({
  selector: 'kt-edit-type-piece-joint',
  templateUrl: './edit-type-piece-joint.component.html',
  styleUrls: ['./edit-type-piece-joint.component.scss']
})
export class EditTypePieceJointComponent implements OnInit {
  id
  typeAo={
    libelle:''
  }  
  constructor(private activatedRoute: ActivatedRoute,private service:GestionTypePieceJointService,private router: Router,	) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
        // this.idConsultation = params["idC"];
      });
      this.service.findById(this.id).subscribe((res)=>{
        
        this.typeAo=res
      })
    }
    onSubmit() {
      this.typeAo
    
  
      this.service.update(this.typeAo).subscribe((data) => {
        console.log(data);
  
      
        this.router.navigate(["parametrage/list-type-piece-joint"]);
      
      });
    }
  }
  