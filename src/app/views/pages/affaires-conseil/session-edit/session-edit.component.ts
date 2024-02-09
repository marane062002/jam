import { Component, OnInit } from '@angular/core';
import { AffairesConseilService } from '../../shared/affaires-conseil.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-session-edit',
  templateUrl: './session-edit.component.html',
  styleUrls: ['./session-edit.component.scss']
})
export class SessionEditComponent implements OnInit {
  loading = false;
  idSession;
  typeSession=["عادية","إستثنائية"];
  statutSession=["ملغاة",
      "مفتوحة"," مغلقة"];
  formData={"id":0,"mondat":{"id":0},"dateFinSession":null,"dateDebutSession":null,"type":"",
  "nomSession":"","statut":"","numSession":""};

  constructor(private service : AffairesConseilService, private router: Router,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idSession= params['id'];
     });

    this.service.getSessionById(this.idSession).subscribe(data=>{
      this.formData=data;
      this.service.getSessionOperationnelle().subscribe(res=>{
        console.log(res.length)
        if(res.length==2){
          console.log(1)
          this.statutSession=["ملغاة",
          " مغلقة"];
        }
        if(res.length==1 && this.formData.type==res[0].type){
          console.log(2)
          this.statutSession=["ملغاة",
          " مغلقة"];
        }

      })
     })
  }



  send(){
	this.loading = true;
    this.service.editSession(this.formData).subscribe(res=>{
      this.router.navigate(['/affaires-conseil/session-list'])
    })
  }

  back(){
	this.router.navigate(['/affaires-conseil/session-list'])
  }

}
