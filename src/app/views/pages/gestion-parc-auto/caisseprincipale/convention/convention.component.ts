import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConventionServiceService } from '../../../../../core/_base/layout/services/parcAuto/convention-service.service';
import { Convention } from '../../../../../core/_base/layout/models/parcAUto/convention';

@Component({
  selector: 'convention',
  templateUrl: './convention.component.html',
  styleUrls: ['./convention.component.scss']
})
export class ConventionComponent implements OnInit {

  headerData:any=[
    { name: "Date", content: "dateConvention" },
    { name: "Numéro convention", content: "numero" },
    { name: "Type convention", content: "type" },
    { name: "Montant", content: "montant" },
    { name: "Année", content: "annee" }
  ]
  currentPage=0;
  size=5;
  totalPages=1;
  id_convention=0;
  listeConventions:any[];
  convention:Convention
  actions: any = { canModify:true ,canAdd:true,withAction:true, canDelete:true, canDetail:true}
  formConvention:FormGroup;
  constructor(private modalService: NgbModal, private conventionService:ConventionServiceService) { 
    this.formConvention= new FormGroup({
      type: new FormControl('',Validators.required),
     // categorieConvention: new FormControl('',Validators.required),
      numero: new FormControl('',Validators.required),
      annee: new FormControl('',Validators.required),
      dateConvention: new FormControl('',Validators.required),
      montant: new FormControl(0,Validators.required),
      
  })
  }

  

  ngOnInit() {
    this.findAllConvention();
  }
  findAllConvention(){
    this.conventionService.pageable(this.currentPage, this.size).subscribe((res:any)=>{
      this.listeConventions=res.Content;
      this.totalPages=res.totalPages;
    })
  }

  modalAjouterConvention(content:any){
    this.modalService.open(content, {
      size: "lg",
    });
  }

  modalModifierConvention(content:any,data:any){
    this.formConvention.patchValue(data);
    this.id_convention=data.id;
    this.modalService.open(content, {
      size: "lg",
    });
  }
  modalDetailConvention(content:any,data:any){
  this.convention=data;
    this.modalService.open(content, {
      size: "lg",
    });
  }
  supprimerConvention(data:any){
    Swal.fire({
      title: ' ',
      text: "voulez-vous vraiment supprimer cette convention  ?",
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
            title: 'convention à été   supprimé avec succès !',
            icon: 'success',
          });
        },err=>{
          console.log(err)
        })
     
      } 
    })
  }


  close(){
    this.modalService.dismissAll();
  }

  ajouterInfoConvention() {
    this.modalService.dismissAll();
   
  }
  

  updateConvention(value:any){
    if(this.formConvention.valid){
     this.conventionService.update(this.id_convention,value).subscribe(res=>{
       Swal.fire({
         title: 'Convention a été Modfier avec succés',
         icon: 'success',
       });
       this.close();
       this.ngOnInit();
       this.formConvention.reset();
     })
    }
   }
  createConvention(value:any){
   if(this.formConvention.valid){
    this.conventionService.save(value).subscribe(res=>{
      Swal.fire({
        title: 'Convention a été ajoutée avec succés',
        icon: 'success',
      });
      this.close();
      this.ngOnInit();
      this.formConvention.reset();
    })
   }
  }
  pageCurrentChange(event :any){
    this.currentPage=event;
  
    console.log(this.currentPage, this.size)
    this.findAllConvention();
  }
    sizeCurrentChange(event :any){
      this.size=event;
      this.currentPage=0;
      console.log(this.currentPage, this.size)
      this.findAllConvention();
     }

}
