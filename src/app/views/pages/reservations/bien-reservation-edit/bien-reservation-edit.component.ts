import { Component, OnInit } from '@angular/core';
import { BiensReservationService } from '../../shared/biens-reservation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, NgForm, FormArray } from '@angular/forms';

@Component({
  selector: 'kt-bien-reservation-edit',
  templateUrl: './bien-reservation-edit.component.html',
  styleUrls: ['./bien-reservation-edit.component.scss']
})
export class BienReservationEditComponent implements OnInit {
  constructor(private fb: FormBuilder,private service : BiensReservationService, private activatedRoute: ActivatedRoute,private router:Router) { }
  myForm: FormGroup;
  reclam;
  bien={"objetDemandeAutorisation":"","typebiendemandeReservation":{"id":0,"libelle":""},
  "adresse":""};
  espaces;
  typeAll;
  arr: FormArray;
   ngOnInit() {
    this.myForm = this.fb.group({
      arr: this.fb.array([this.createItem()])
    })
  
  
     this.activatedRoute.queryParams.subscribe(params => {
       this.reclam= params['reclam']; 
       this.service.getEspaceByBien(this.reclam).subscribe(da => { 
        console.log(da)
        this.espaces=da;
    });
      });
      this.service.getbienById(this.reclam).subscribe(data => { 
        console.log(data)
      this.bien = data;
  
   });
 this.service.getTypesBien().subscribe(res => {
  console.log(res)
  this.typeAll=res;
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

 createItem() {
  return this.fb.group({
    espace: [''],
    prix: ['']
  })
}

onSubmitForm() {
  var esp={espace:"",prix:"",bienReservation:{id:0}}
    console.log(this.bien)
  this.service.edit(this.bien).subscribe(res => {
    //this.router.navigate(['/personne-physique/personne-physique-list']); 
   for (var i = 0; i < this.myForm.value.arr.length; i++) {
     console.log(this.myForm.value.arr[i])
     esp.espace=this.myForm.value.arr[i].espace
     esp.prix=this.myForm.value.arr[i].prix
     esp.bienReservation.id=res
     console.log(esp)
   this.service.sendespace(esp).subscribe(resultat => {
    })
  }
 this.router.navigate(['/reservations/bienreservations-list']);
   
  })
}

}
