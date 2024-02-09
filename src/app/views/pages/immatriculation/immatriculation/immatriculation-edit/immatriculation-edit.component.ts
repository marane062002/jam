import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImmatriculationService } from '../../services/immatriculation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../shared/notification.service';
import { Location } from '@angular/common';
import { MatTableDataSource } from '@angular/material';
import { AoService } from '../../../shared/ao.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-immatriculation-edit',
  templateUrl: './immatriculation-edit.component.html',
  styleUrls: ['./immatriculation-edit.component.scss']
})
export class ImmatriculationEditComponent implements OnInit {
  loading = false;
  immForm: FormGroup; 
  types:any;
  etats:any;   
  id:number     
  dataSource1: MatTableDataSource<any>;
  displayedColumns1 = ["type", "nomDoc","dow","action"];
  formPj = { type: 0, selecetedFile: {} };
  allpjs = [];
  unites;
  constructor(private service:ImmatriculationService,
    private router: Router,
    private fb:FormBuilder,
    private route: ActivatedRoute,
    private notification:NotificationService,
    private location:Location,
    private service3:AoService

  ) {  
    
    this.route.queryParams.subscribe(params =>{
      this.id = params['id']
    })
    
    console.log('ID: ' + this.id);

    this.immForm = this.fb.group({      
      id:[this.id],
      numDossierInterne: ['',Validators.required ],
      numDossierUrbanisme:['', Validators.required],
      numDossierCf:['', Validators.required],	
      superficier:[''],	
      localisation:[''],
      remarque:[''],
      type:[''],
      etat:this.fb.group({
        id: []
      })
      })
    
    this.service.getImmatriculationById(this.id)
    .subscribe(data =>{
      console.log(JSON.stringify(data[0],null,4))
      this.immForm.patchValue(data[0]);
    })
    this.getAllPjImm(this.id);
    this.service3.getAlltypePJIMM().subscribe((res) => {
			console.log(res);
			this.unites = res;
		});
  }

  
  async getAllPjImm(id){ 
    await this.service.getAllPjImm(id).subscribe(data => {   
      this.allpjs=data;     
      this.dataSource1 = new MatTableDataSource(data);
   }, error => console.log(error));
   
   }
   save(event: any): void {
		this.formPj.selecetedFile = event.target.files;
	}
	// ====================================================
	//
	//=====================================================
	validerPj() {
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.formPj = { type: 0, selecetedFile: {} };
	}
   deleteFile(id){
  

    Swal.fire({
      title: 'هل تريد حذف الملف؟',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'نعم',
      denyButtonText: `لا`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if(id!=undefined){
          this.allpjs=this.allpjs.filter(e=>e.id!=id)
          this.dataSource1 = new MatTableDataSource(this.allpjs);
          this.service.delete(id)
          .subscribe((data) => {
            console.log("C: " + JSON.stringify(data, null, 2));
          });
        } 
      } 
    })
 
 console.log(id);
 console.log(this.allpjs);
   }
  ngOnInit() {
    this.getData()
    
     
  }
    get f() { return this.immForm?this.immForm.controls:null; }
    
 
  async getData(){
    await this.service.getDataImmatriculation()
    .subscribe(data => {
      this.types = data[0];
      this.etats = data[1];
      
    
    }, err => {
      console.log(err);
      
    }
    );

   
  }
  
 
  
  onSubmit(){
   
    const formValues = this.immForm.value
    const controls = this.immForm.controls;
    /** check form */
 	if (this.immForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const imm: any = Object.assign({}, formValues);
     console.log(imm)
 
   this.service.saveImmatriculation(imm)
    .subscribe(data =>{
              console.log(data) 
             
              if (this.allpjs.length > 0) {
                for (var i = 0; i < this.allpjs.length; i++) {
                  this.service.nouvellepj1(this.allpjs[i].selecetedFile,	data.id,	this.allpjs[i].type.id,"IMM",this.allpjs[i].idAlfresco)
                    .subscribe((data) => {
                      console.log("C: " + JSON.stringify(data, null, 2));
                    });
                }
                this.router.navigate(['immatriculation/immatriculation-index'])
              }else{
                this.router.navigate(['immatriculation/immatriculation-index'])
              }
               },
              error => console.log(error)
            );    
  }

  back(){
    this.location.back()
  }
  

  /**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.immForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }

}
