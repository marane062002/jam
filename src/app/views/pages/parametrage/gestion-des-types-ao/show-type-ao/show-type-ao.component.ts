import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GestionDesTypesAoService } from '../../Services/gestion-des-types-ao.service';

@Component({
  selector: 'kt-show-type-ao',
  templateUrl: './show-type-ao.component.html',
  styleUrls: ['./show-type-ao.component.scss']
})
export class ShowTypeAoComponent implements OnInit {
id
typeAo
  constructor(private activatedRoute: ActivatedRoute,private service:GestionDesTypesAoService,private router: Router,) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.id = params["id"];
		});
    this.service.findById(this.id).subscribe((res)=>{
      
      this.typeAo=res
    })
  }

}
