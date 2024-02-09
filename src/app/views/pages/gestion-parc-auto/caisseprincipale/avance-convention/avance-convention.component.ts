import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AvanceConventionService } from '../../../../../core/_base/layout/services/parcAuto/avance-convention.service';
import { ConventionServiceService } from '../../../../../core/_base/layout/services/parcAuto/convention-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AvanceConvention } from '../../../../../core/_base/layout/models/parcAUto/avance-convention';

@Component({
  selector: 'avance-convention',
  templateUrl: './avance-convention.component.html',
  styleUrls: ['./avance-convention.component.scss']
})
export class AvanceConventionComponent implements OnInit {
  headerData:any=[
    { name: "Date", content: "date" },
    { name: "Numéro", content: "numero" },
    { name: "Type", content: "convention.type" },
    { name: "Montant", content: "montant" },
    { name: "Année", content: "annee" },
    { name: "Convention", content: "convention.numero" }
  ]

  listeConventions:any[]=[];
  listeAvanceConventions:any[];
  actions: any = {canDetail:true, canModify:true ,canAdd:true,withAction:true, canDelete:true}

  conventionAvance:AvanceConvention;
  currentPage=0;
  size=5;
  totalPages=1;
  id_avaneCon=0;
  
  formAvanceConvention:FormGroup;
 
  constructor(private modalService: NgbModal, 
    private avanceConService:AvanceConventionService,
     private conventionService:ConventionServiceService ) {
      this.formAvanceConvention= new FormGroup({
        convention: new FormGroup({
          id: new FormControl('',Validators.required),
        }),
        type: new FormControl('',Validators.required),
     //  categorieConvention: new FormControl('',Validators.required),
        numero: new FormControl('',Validators.required),
        annee: new FormControl('',Validators.required),
        date: new FormControl('',Validators.required),
        montant: new FormControl(0,Validators.required),
        
    })
     }

  ngOnInit() {
    this.finAll();
  }

finAll(){
  this.avanceConService.pageable(this.currentPage, this.size).subscribe((res:any)=>{
    this.listeAvanceConventions=res.Content;
    this.totalPages=res.totalPages;
  })
}

  modalAjouterAvancesConvention(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalDetailAvancesConvention(content:any,data:any){
    this.conventionAvance=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierAvancesConvention(content:any,data:any){
    this.formAvanceConvention.patchValue(data);
    this.id_avaneCon=data.id;
    this.formAvanceConvention.get("type").setValue(data.convention.type);
    this.findconventionBytype(data.convention.type);
    this.modalService.open(content, {
      size: "lg",
    });
  }


  close(){
    this.modalService.dismissAll();
  }
  selectedTypeConvention(event:any){
    if(event.target.value){
      this.findconventionBytype(event.target.value);
      this.formAvanceConvention.get("convention").reset();
    }

  }
  findconventionBytype(type:String){
    this.conventionService.findAllByType(type).subscribe(res=>{
      this.listeConventions=res;
      
    },err=>{
      console.log(err);
    })
  }

  ajouterInfoAvanceConvention() {
   
  }
  supprimerAvancesConvention(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer cette Avance convention  ?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Fermer'
  
    }).then((result) => {
       if (result.isConfirmed) {
        this.conventionService.delete(data).subscribe(res=>{
          this.ngOnInit();
          Swal.fire({
            title: 'Avance convention à été   supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })
     
      } 
    })
  }
  createAvanceConvention(value:any){
    console.log(value)
   if(this.formAvanceConvention.valid){
    this.avanceConService.save(value).subscribe(res=>{
      this.modalService.dismissAll();
      Swal.fire({
        title: 'Avance Convention a été ajoutée avec succés',
        icon: 'success',
      });
      this.formAvanceConvention.reset();
    })
   }
  }
  updateAvanceConvention(value:any){
    if(this.formAvanceConvention.valid){
     this.avanceConService.update(this.id_avaneCon,value).subscribe(res=>{
       Swal.fire({
         title: 'Avance convention a été Modfier avec succés',
         icon: 'success',
       });
       this.close();
       this.ngOnInit();
       this.formAvanceConvention.reset();
     })
    }
   }

  
  pageCurrentChange(event :any){
    this.currentPage=event;
  
    console.log(this.currentPage, this.size)
    this.finAll();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      this.currentPage=0;
      console.log(this.currentPage, this.size)
      this.finAll();
     }
}
