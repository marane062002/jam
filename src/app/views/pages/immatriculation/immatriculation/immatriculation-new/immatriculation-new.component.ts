import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImmatriculationService } from '../../services/immatriculation.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ImmobilisationService } from '../../../utils/immobilisation.service';
import { AoService } from '../../../shared/ao.service';
import { MatTableDataSource } from '@angular/material';
import * as $ from "jquery";
@Component({
  selector: 'kt-immatriculation-new',
  templateUrl: './immatriculation-new.component.html',
  styleUrls: ['./immatriculation-new.component.scss']
})
export class ImmatriculationNewComponent implements OnInit {

  loading = false;
  immForm: FormGroup;
  types:any;
  etats:any;
  formPj = { type: 0, selecetedFile: {} };
	allpjs = [];
  unites;
	showAddDoc = false;
  	// ====================================================
	//
	//=====================================================
	dataSource1: MatTableDataSource<any>;
  displayedColumns1 = ["type", "nomDoc"];
  constructor(
    private service:ImmatriculationService,
    private  service2:ImmobilisationService,
    private router: Router,
    private fb:FormBuilder,
    private location:Location,
    private service3:AoService

  ) {

    this.getData()
  }



  ngOnInit() {

	this.getData();
    this.immForm = this.fb.group({

    /*   numDossierInterne: ['', Validators.compose([
              Validators.required,
                  ])
                  ], */
      numDossierUrbanisme:['', Validators.required],
      numDossierCf:[null, Validators.required],
      superficier:[null],
      localisation:[null],
      remarque:[null],
      type:[null, Validators.required],
      etat:[null, Validators.required],




      })

  }
    get f() { return this.immForm?this.immForm.controls:null; }


 async getData(){
  /*    await this.service2.getData().subscribe(data => {
      console.log(data)
      this.types = data[5];
      this.etats = data[0];

    }, err => {
      console.log(err);

    }); */
    this.service3.getAlltypePJIMM().subscribe((res) => {
			console.log(res);
			this.unites = res;
		});
     await this.service.getInitFormForCreateImmatriculation().subscribe(data => {
       console.log(data)
      this.types = data[0].typesBiens;
      this.etats = data[0].etatdossiers;

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

   this.service.saveImmatriculation(imm).subscribe(data =>{
     
    if (this.allpjs.length > 0) {
      for (var i = 0; i < this.allpjs.length; i++) {
        this.service.nouvellepj(this.allpjs[i].selecetedFile,	data.id,	this.allpjs[i].type.id,"IMM"	)
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

  // back(){
  //   this.location.back()
  // }

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
  	// ====================================================
	//
	//=====================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}
	// ====================================================
	//
	//=====================================================
	validerPj() {
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.showAddDoc = false;
		this.formPj = { type: 0, selecetedFile: {} };
	}


}
