import { Component, OnInit } from '@angular/core';
import { ImmatriculationService } from '../../services/immatriculation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../../shared/notification.service';
import { MatTableDataSource } from '@angular/material';
import { environment } from "../../../../../../environments/environment";

@Component({
  selector: 'kt-immatriculation-show',
  templateUrl: './immatriculation-show.component.html',
  styleUrls: ['./immatriculation-show.component.scss']
})
export class ImmatriculationShowComponent implements OnInit {
  id:number;
  
  immatriculation:any;
	dataSource1: MatTableDataSource<any>;
  displayedColumns1 = ["type", "nomDoc","dow"];
  constructor(private service:ImmatriculationService,
   
    private router: Router,private route: ActivatedRoute,
    private translate:TranslateService,
    private notification:NotificationService) { 
      
      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
      this.getImmatriculationById(this.id)
      this.getAllPjImm(this.id);
    }

  ngOnInit() {
   
     
  }
  onClickPj(e, id) {
		var r = e.substring(0, e.length - 4);
		window.open(environment.API_ALFRESCO_URL + "/PjImm/" + r, "_blank");
	}
  async getImmatriculationById(id){ 
   await this.service.getImmatriculationById(id).subscribe(data => {        
    this.immatriculation = data[0];
  }, error => console.log(error));
  
  }
  async getAllPjImm(id){ 
    await this.service.getAllPjImm(id).subscribe(data => {        
      this.dataSource1 = new MatTableDataSource(data);
   }, error => console.log(error));
   
   }
  

  public delete(id: number) {
    if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
      this.service.deleteImmatriculation(id)
      .subscribe(
        data => {
          console.log(data),
          this.router.navigateByUrl('immatriculation/immatriculation-index')
        },
        error => console.log(error)); 
        this.notification.warn(
        	this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
      	);
    }
     
  }
 
  update(){
    this.router.navigate(['/immatriculation/immatriculation-edit'], { queryParams: { id: this.id } })
  }

 


}
