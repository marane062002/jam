import { Component, OnInit } from '@angular/core';
import { PatrimoineService } from '../../services/patrimoine.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'kt-mvmlocation-show',
  templateUrl: './mvmlocation-show.component.html',
  styleUrls: ['./mvmlocation-show.component.scss']
})
export class MvmlocationShowComponent implements OnInit {

  id:number;
  idPatrimoine:number;
  mvmlocation:any;
  idParent:number;

  constructor(private service:PatrimoineService,
   
    private router: Router,private route: ActivatedRoute) { 
      
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
        this.idParent = params['idParent'];
      });
      this.getMvmLocationById(this.id)
    }

  ngOnInit() {
   
     
  }
  async getMvmLocationById(id){ 
   await this.service.getMvmLById(id)      
  .subscribe(data => {        
    this.mvmlocation = data[0];
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
    this.router.navigate(['/patrimoine/mvmlocation-edit'], { queryParams: { id: this.id, idParent : this.idParent } })
  }

  showPatrimoine(id){
    this.router.navigate(['patrimoine/patrimoine-show'] , { queryParams: { id: id } })
  }

}
