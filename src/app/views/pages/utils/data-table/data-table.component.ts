import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {

  @Input() titleTable:string;

  @Input() titleButton:string;
  @Input() titleButtonDelete:string;

  @Input() headers: {name: string, content: string ,pipe:string,sort:string}[];

  @Input() datasource:any[]=[];

  @Input() actions: {canAffectVignette:boolean,canLivreStock:boolean ,canAffectCarteAuto:boolean,canAffectCar:boolean,canaffectDemande:boolean,canDetail: boolean,cantransfer: boolean, canModify: boolean, canDelete: boolean ,canAdd:boolean,addArticle:boolean,withAction:boolean,withCheckbox:boolean,deleteALL:boolean};  

  @Input() contentModal: string;
  @Output() addArticleMagasin =new EventEmitter(); 
  @Output() ajouterElement =new EventEmitter();

  @Output() detail = new EventEmitter();
  @Output() affectDemandeMission= new EventEmitter();
  @Output() selectUpdateElement=new EventEmitter();

  @Output() deleteElement=new EventEmitter();

  @Output() selectedItems=new EventEmitter();
  @Output() livreSortie= new EventEmitter();
@Output() affectedCarElement=new EventEmitter();
@Output() affectedCarteAutoElement=new EventEmitter();
  // pagination 
  @Output() size = new EventEmitter();
  @Output() page = new EventEmitter();
  @Input() currentPage:number;
  @Input() totalPages:number;


  currentSelected:any[]=[];
  selectedAll:boolean;
  selectedOne:boolean;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  
  chnagePageEvent(value:number){
    this.page.emit(value)
    console.log(value)
  }
  chnageSizeEvent(event:any){

    this.size.emit(event.target.value)
    this.page.emit(0);
    console.log( event.target.value)
  }
  openLarge(objetChoisi:any) {
    if(this.contentModal) {
      this.modalService.open(this.contentModal, {
        size: 'xl',
        centered: true
      });
    }
  
    this.detail.emit(objetChoisi)
  }
  livreSortieStock(item:any){
    this.livreSortie.emit(item);
      }
  affectDemande(item:any){
this.affectDemandeMission.emit(item);
  }
  addArticle(objetChoisi:any)
  {
    if(this.contentModal) {
      this.modalService.open(this.contentModal, {
        size: 'xl',
        centered: true
      });
    }
  
    this.addArticleMagasin.emit(objetChoisi);
  }
  selectupdate(id:any)
  {
    this.selectUpdateElement.emit(id)
  }
  affectedCar(id:any)
  {
    this.affectedCarElement.emit(id)
  }
  affecteCarteAuto(item:any)
  {
    this.affectedCarteAutoElement.emit(item)
  }
  delete(id:any)
  {
    this.deleteElement.emit(id)
  }

  ajouter(){
    this.ajouterElement.emit()
  }

  onCheckboxChange(item:any,event:any,idCheck?:any){
    const isChecked=event.target.checked
    if(idCheck===1){
      if(this.selectedAll==true){
        this.datasource.forEach((element:any) => {
          if(this.currentSelected.findIndex((i:any)=>i.id==element.id)===-1){
            this.currentSelected.push(element)
            isChecked==true
          }
        });
        this.selectedOne=true
      }else{
        this.currentSelected.splice(0,this.currentSelected.length)
        isChecked==false
        this.selectedOne=false
      }
    }else{
      if(isChecked){ this.currentSelected.push(item); }
      else{
        const index = this.currentSelected.findIndex((d:any)=>d.id==item.id);
        this.currentSelected.splice(index, 1);
        this.selectedAll=false
      }
    }
  }
  
  submitChecked(){
  this.selectedItems.emit(this.currentSelected)
  this.currentSelected=[]
  }

}
