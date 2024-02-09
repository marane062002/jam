import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionTypeMarcheService } from '../../Services/gestion-type-marche.service';

@Component({
  selector: 'kt-show-type-marche',
  templateUrl: './show-type-marche.component.html',
  styleUrls: ['./show-type-marche.component.scss']
})
export class ShowTypeMarcheComponent implements OnInit {

  id
  typeMarche
    constructor(private activatedRoute: ActivatedRoute,private service:GestionTypeMarcheService,private router: Router,) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
      this.service.findById(this.id).subscribe((res)=>{
        
        this.typeMarche=res
      })
    }
  
  }
