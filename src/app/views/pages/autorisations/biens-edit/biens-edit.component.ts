import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BiensService } from '../../shared/biens.service';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'kt-biens-edit',
  templateUrl: './biens-edit.component.html',
  styleUrls: ['./biens-edit.component.scss']
})
export class BiensEditComponent implements OnInit {
  myForm: FormGroup;
  arr: FormArray;
  reclam;
  bien={"typeObjetReservation":{"id":0},"objetDemandeAutorisation":"","adresse":""};
  espaces;
  typeAll;
  constructor(private fb: FormBuilder,private service : BiensService, 
    private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })

    this.activatedRoute.queryParams.subscribe(params => {
      this.reclam= params['reclam']; 
     });
     this.service.getbienById(this.reclam).subscribe(data => { 
       console.log(data)
     this.bien = data;

  });
  this.service.getEspaceByBien(this.reclam).subscribe(da => { 
    console.log(da)
    this.espaces=da;
  });
  this.service.getTypesBien().subscribe(res => {
    this.typeAll=res;
  })
  }
  createItem() {
    return this.fb.group({
      espace: ['']
    })
  }
  
  addItem() {
    this.arr = this.myForm.get('arr') as FormArray;
    this.arr.push(this.createItem());
  }
  removeGroup(i: number) {
    // remove address from the list
    this.arr = this.myForm.get('arr') as FormArray;
    //const control = <FormArray>this.myForm.controls['times'];
    this.arr.removeAt(i);
  }

  save(){
    var esp={espace:"",objetDemandeAutorisation:{id:0}}
  this.service.updatebien(this.bien).subscribe(res => {
   for (var i = 0; i < this.myForm.value.arr.length; i++) {
     console.log(this.myForm.value.arr[i])
     esp.espace=this.myForm.value.arr[i].espace
     esp.objetDemandeAutorisation.id=res;
    this.service.sendespace(esp).subscribe(resultat => {
          console.log(resultat)
    })
  }
  this.router.navigate(['/autorisations/biens-list']);
   
  })
  }

}
