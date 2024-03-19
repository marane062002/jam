import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrelevementService } from '../services/prelevement.service';

@Component({
  selector: 'kt-list-prelevement',
  templateUrl: './list-prelevement.component.html',
  styleUrls: ['./list-prelevement.component.scss']
})
export class ListPrelevementComponent implements OnInit {

  prelevement:InterfacePrelevemnt[]=[]
  displayedColumns: string[] = [
		"ID",
		"Date",
		"Statut",
		"actions",
	];
  id:any;
  constructor(private route: ActivatedRoute,private router:Router,private service:PrelevementService) { }


  ngOnInit() {
    this.route.params.subscribe((params) => {
			this.id = +params['id']; 
		  });
    this.service.getAll(this.id).subscribe(res=>{
      this.prelevement=res;
    })
    
  }
  add(){
    this.router.navigate([`/bmh1/add-prelevement/${this.id}`])
  }
  Details(id:any){
    return this.router.navigate(["/bmh1/details-prelevement/",id])
  }
  Modifier(id:any){
    this.router.navigate(["/bmh1/update-prelevement/",id])
  }

}
export interface InterfacePrelevemnt{
  id:number;
  date:Date;
  status:string;
}
