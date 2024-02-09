import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionCategorieService } from '../../Services/gestion-categorie.service';

@Component({
  selector: 'kt-show-categorie',
  templateUrl: './show-categorie.component.html',
  styleUrls: ['./show-categorie.component.scss']
})
export class ShowCategorieComponent implements OnInit {

  id
  categorie
    constructor(private activatedRoute: ActivatedRoute,private service:GestionCategorieService,private router: Router,) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
      this.service.findById(this.id).subscribe((res)=>{
        
        this.categorie=res
      })
    }
  
  }