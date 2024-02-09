import { Component, OnInit } from '@angular/core';
import { PersonnelService } from '../../services/personnel.service';
import { Router, ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';
import { OrganisationService } from '../../../organisation/organisation.service';
import { forkJoin, Observable, Observer } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface Personnel360Tab {
	label: string;
	content: string;
}

@Component({
  selector: 'kt-personnel-show',
  templateUrl: './personnel-show.component.html',
  styleUrls: ['./personnel-show.component.scss']
})
export class PersonnelShowComponent implements OnInit {
  // =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<Personnel360Tab[]>;
	selected = new FormControl(0);
  id:number;
  personnel:any;
  divisionLibelle:any;
  serviceLibelle:any;
  constructor(private service:PersonnelService,
    private service1 : OrganisationService,
    private router: Router,private route: ActivatedRoute) {

      this.route.queryParams.subscribe(params => {
        this.id= params['id'];
      });
      this.getPersonnel()
      this.asyncTabs = new Observable(
        (observer: Observer<Personnel360Tab[]>) => {
          setTimeout(() => {
            observer.next([
              {
                label: "MENU.PRESENCES",
                content: '1',
              },
               {
                label: "MENU.PERMANENCES",
                content: "2"
              },
               {
                label: "MENU.NOTATIONS",
                content: "3"
              },
               {
                label: "MENU.ATTESTATIONS",
                content: "4"
              }/* ,
               {
                label: "PAGES.ASSOCIATION.TAB_CONVENTION",
                content: "5"
              } */
             ]);
          }, 1000);
        }
      );
    }

  ngOnInit() {


  }

   getPersonnel(){

    this.service.getPersonnelById(this.id)
    .then(data =>{
        this.personnel = data

        if(this.personnel.idDivision!=0) {
          this.service1.findEntityById(this.personnel.idDivision,'/divisions/find/').subscribe(d => {this.divisionLibelle =d.libelle,console.log(this.divisionLibelle)})

        }
        if(this.personnel.idService!=0) {
       this.service1.findEntityById(this.personnel.idService,'/services/find/').subscribe(s => {this.serviceLibelle = s.libelle})

        }
    }

     , error => console.log(error));

  }
  public delete(id: number) {
    this.service.deleteRessource(id,'/personnels/delete/')
      .subscribe(
        data => {
          console.log(data),
          this.router.navigate(['personnel/personnel-index'])

        },
        error => console.log(error));
  }


  update(param){
	  console.log("ID: "+ param)
	this.router.navigate(['/personnel/personnel-edit'], { queryParams: { id: param } })
  }
}
