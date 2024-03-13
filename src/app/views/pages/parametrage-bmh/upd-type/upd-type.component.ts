import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeServiceService } from '../services/type-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InterfaceType } from '../list-types/list-types.component';

@Component({
  selector: 'kt-upd-type',
  templateUrl: './upd-type.component.html',
  styleUrls: ['./upd-type.component.scss']
})
export class UpdTypeComponent implements OnInit {

  constructor( private route: ActivatedRoute,private router:Router,private service : TypeServiceService) { }

  FormArticle= new FormGroup({
 
    id: new FormControl(''),
    libelle: new FormControl('',Validators.required),
    description: new FormControl('',Validators.required),
    
      });
  
  typeDetails: any;
  ngOnInit() {

    const id = this.route.snapshot.params["id"];
    this.service.getTypeDetailsById(id).subscribe((res)=>{
      console.log(res)
              this.FormArticle.patchValue({...res});
              // this.FormArticle.patchValue({
              //   id:res.id,
              //   description:res.description,
              //   libelle:res.libelle
              // });
      this.FormArticle.value 
      // this.dataSource = this.data.historiqueCammunal
    },
    (err)=>{
          console.log(err)
    });
  }

  RetourEmbalages(): void {
		this.router.navigate(["/bmh/list-types"]);
	}
  updateType() {
    if (this.FormArticle.valid) {
    this.service.editType(this.FormArticle.value.id,this.FormArticle.value).subscribe(
      (res) => {
        console.log('Type mis à jour avec succès :', res);
        this.RetourEmbalages()
      },
      (err) => {
        console.error('Erreur lors de la mise à jour du type :', err);
      }
    );
    }else{
      console.log('le formulaire est invalide');
    }
  }

}
