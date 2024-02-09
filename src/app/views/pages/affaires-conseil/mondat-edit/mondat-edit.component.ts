import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-mondat-edit',
  templateUrl: './mondat-edit.component.html',
  styleUrls: ['./mondat-edit.component.scss']
})
export class MondatEditComponent implements OnInit {
  loading = false;
  idMondat;
  formData={statut:"","dateFinMondat":null,"dateDebutMondat":null,"id":0};
  statutMondat=[" أرشيف"];

  constructor(private service : AffairesConseilService,
     private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idMondat= params['id'];
     });
     this.service.getMondatActuel().subscribe(data=>{
      if(data==[]){
        this.statutMondat=["مفعلة"," أرشيف"];
      }
    })
    this.service.getMondatById(this.idMondat).subscribe(data=>{
      this.formData=data;
      console.log(this.formData)
     })
  }

  send() {
	this.loading = true;
    this.service.editMondat(this.formData)
    .subscribe((res1) => {
      this.router.navigate(['/affaires-conseil/mondat-list'])
   });

}}
