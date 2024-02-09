import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionQualificationService } from '../../Services/gestion-qualification.service';

@Component({
  selector: 'kt-show-qualification',
  templateUrl: './show-qualification.component.html',
  styleUrls: ['./show-qualification.component.scss']
})
export class ShowQualificationComponent implements OnInit {

  id
  typeAo
    constructor(private activatedRoute: ActivatedRoute,private service:GestionQualificationService,private router: Router,) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
      this.service.findById(this.id).subscribe((res)=>{
        
        this.typeAo=res
      })
    }
  
  }
  