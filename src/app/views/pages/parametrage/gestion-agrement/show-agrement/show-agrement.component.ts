import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionAgrementService } from '../../Services/gestion-agrement.service';
import { AoService } from '../../../shared/ao.service';

@Component({
  selector: 'kt-show-agrement',
  templateUrl: './show-agrement.component.html',
  styleUrls: ['./show-agrement.component.scss']
})
export class ShowAgrementComponent implements OnInit {

  id
  agrement
    constructor(private activatedRoute: ActivatedRoute,private service:AoService,private router: Router,) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
      this.service.getAgrementMarcheById(this.id).subscribe((res)=>{
        
        this.agrement=res
      })
    }
  
  }