import { Component, OnInit } from '@angular/core';
import { PatrimoineService } from '../../services/patrimoine.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbPaginationNumber } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'kt-mvmtransaction-show',
  templateUrl: './mvmtransaction-show.component.html',
  styleUrls: ['./mvmtransaction-show.component.scss']
})
export class MvmtransactionShowComponent implements OnInit {

  id:number;
  idPatrimoine:number;
  mvmtransaction:any;
  idParent:NgbPaginationNumber;

  constructor(private service:PatrimoineService,
   
    private router: Router,private route: ActivatedRoute) { 
      
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
        this.idParent = params['idParent']
      });
      this.getmvmtransactionById(this.id)
    }

  ngOnInit() {
   
     
  }
  async getmvmtransactionById(id){ 
   await this.service.getMvmTById(id)      
  .subscribe(data => {        
    this.mvmtransaction = data[0];
    this.idPatrimoine = data[0].patrimoine.id;
    
  }, error => console.log(error));
  
  }
  public delete(id: number) { 
    this.service.deleteMvmL(id)
      .subscribe(
        data => {
          console.log(data),
         this.showPatrimoine(this.idPatrimoine)
          
        },
        error => console.log(error));
  }

 
  update(){
    this.router.navigate(['/patrimoine/mvmtransaction-edit'], { queryParams: { id: this.id, idParent : this.idParent  } })
  }

  showPatrimoine(id){
    this.router.navigate(['patrimoine/patrimoine-show'] , { queryParams: { id: id } })
  }

}
