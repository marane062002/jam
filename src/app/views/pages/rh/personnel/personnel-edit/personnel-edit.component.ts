import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonnelService } from '../../services/personnel.service';
import { OrganisationService } from '../../../organisation/organisation.service';



@Component({
  selector: 'kt-personnel-edit',
  templateUrl: './personnel-edit.component.html',
  styleUrls: ['./personnel-edit.component.scss']
})
export class PersonnelEditComponent implements OnInit {


  id:number;
  editForm: FormGroup;
  submitted = false;
  niveauAcademiques:any;
  typePersonnels:any;
  typeConges:any;
  sex:any;
  situationFamilials:any;
  divisions:any;
  services:any;
  loading = false;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private service:PersonnelService,
              private service2:OrganisationService,

              private route:ActivatedRoute) {
				this.route.queryParams.subscribe(params => {
					this.id= params['id'];
				})
				//this.id = this.route.snapshot.params['id'];
				console.log("ID personne:" + this.id)
                this.getData()
              }

  ngOnInit() {

    this.editForm = this.formBuilder.group({
      id:[null],
      matricule:{value: null, disabled: true},
      nom:['', Validators.required],
      prenom:['', Validators.required],
      telephonefix:[null],
      email: ['', Validators.compose([
        Validators.email,
        Validators.minLength(3)

      ])
      ],
      grade:[null],
      echelle:[null],
      echlon:[null],
      cin:['', Validators.required],
      idDivision:[null],
      idService:[null],
      sex:[null, Validators.required],
      situationFamiliale:[null, Validators.required],
      nbEnfantsM:[0],
      nbEnfantsF:[0],
      telephoneGsm:[null],
      dateEmbauche:[''],
      typePersonnel:[null],
      niveauAcademique:[null],
      typesConges:[]
      })






  }
  getData(){

    this.service.getRessourceById(this.id,'/personnels/show/')
    .then( data => {console.log(data);
      this.editForm.patchValue(data);

         /*  if(data.idDivision!==0)
            this.getServices(this.editForm.get('idDivision')) ;

      this.editForm.get('dateEmbauche').patchValue(new Date(data.dateEmbauche).toISOString())  */

    });

    this.service.getData()
    .subscribe(data => {
      this.typeConges = data[0];
      this.niveauAcademiques = data[1];
      this.typePersonnels = data[2];
      this.sex = data[3];
      this.situationFamilials = data[4];
    }, err => {
      console.log(err);

    }
    );
    this.service2.getRessource('/divisions/index')
    .subscribe(data => {this.divisions = data
    });

  }
  getServices(ob){

    const id = ob.value
    if(id != null){
    this.service2.getRessourceById(id,'/services/divisions/')
    .subscribe(data =>{ this.services =data

       },
      error => console.log(error)
    );
  }
  }



      compare(val1, val2) {
        if(val1 && val2)
        return val1.id === val2.id;

      }

      onSubmit(){
        const formValues = this.editForm.value
        const personnel: any = Object.assign({}, formValues);
        const controls = this.editForm.controls;
    /** check form */
		if (this.editForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;



       this.service.updateRessource(personnel,this.id,"/personnels/edit/")
        .subscribe(data =>{ console.log(data),
          this.router.navigate(['personnel/personnel-index'])},
                  error => console.log(error)
                );

      }
/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.editForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
	}

	backList(){
		this.router.navigate(["/personnel/personnel-index"]);
	}

}
