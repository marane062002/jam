import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionTypePieceJointService } from '../../Services/gestion-type-piece-joint.service';

@Component({
  selector: 'kt-show-type-piece-joint',
  templateUrl: './show-type-piece-joint.component.html',
  styleUrls: ['./show-type-piece-joint.component.scss']
})
export class ShowTypePieceJointComponent implements OnInit {
  id
  typeAo
    constructor(private activatedRoute: ActivatedRoute,private service:GestionTypePieceJointService,private router: Router,) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
      this.service.findById(this.id).subscribe((res)=>{
        
        this.typeAo=res
      })
    }
  
  }
  