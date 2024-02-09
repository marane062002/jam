import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionModePassationService } from '../../Services/gestion-mode-passation.service';

@Component({
  selector: 'kt-show-mode-passation',
  templateUrl: './show-mode-passation.component.html',
  styleUrls: ['./show-mode-passation.component.scss']
})
export class ShowModePassationComponent implements OnInit {

  id
  modePassation
    constructor(private activatedRoute: ActivatedRoute,private service:GestionModePassationService,private router: Router,) { }
  
    ngOnInit() {
      this.activatedRoute.queryParams.subscribe((params) => {
        this.id = params["id"];
      });
      this.service.findById(this.id).subscribe((res)=>{
        
        this.modePassation=res
      })
    }
  
  }
