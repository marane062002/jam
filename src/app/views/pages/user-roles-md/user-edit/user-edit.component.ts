import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/auth';
import { PersonnelService } from '../../rh/services/personnel.service';
import { OrganisationService } from '../../organisation/organisation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MustMatch } from '../user-new/must-match';
import { HangarService } from '../../marcheGros/Service/hangar.service';

@Component({
  selector: 'kt-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  loading = false;
  id:number;
  roles:any;
  registerForm: FormGroup;
  _existe:any;
  _confirmed:boolean;
  divisions:any;
  services:any;
  personnels:any;
  changePasse = new FormControl(false);

  Hangar
  constructor(private service:AuthService,
    private service1:PersonnelService,
    private service2:OrganisationService,
    private service3:HangarService,

    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder

  ) {
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
  })



  }


  creatFormGroup(formBuilder: FormBuilder){
     return formBuilder.group({
          id:[null],
          idPersonnel: [0],
          idDivision:[0],
          idService:[0],
          idHangar:[0],
          fullname:['',Validators.required],
          username:[null],

          pic:[null]  ,
          password:{value:null, disabled:true},
          passeConfirmed:{value:null, disabled:true},
          roles:[]
        }, {
          validator: MustMatch('password', 'passeConfirmed')})



  }


  // convenience getter for easy access to form fields


  ngOnInit() {
    this.registerForm = this.creatFormGroup(this.fb);

    this.getRegisterFormData(this.id)



   /*  if(this.registerForm.get('roles'))
    this.registerForm.get('roles').disable() */



  }

  getRegisterFormData(id){
    this.service.getRegisterFormData(id)
    .then(data =>{
      this.registerForm.get('idDivision').setValue(data[0].idDivision)
      this.registerForm.get('roles').setValue( data[1]);
      this.roles = data[1]
      this.divisions= data[2]
      this.onChangeDivision()
      this.registerForm.patchValue(data[0])


      //this.onChangeService()
      //this.onChangePersonnel()

    })

  }

  onSubmit(){

    const formValues = this.registerForm.value
    const controls = this.registerForm.controls;
    /** check form */
		if (this.registerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}

    this.loading = true;
   const compte: any = Object.assign({}, formValues);
 
   console.log(compte)
  console.log(this.registerForm.value)
    this.service.updateCompte(compte,compte.id)
    .subscribe(data =>{
              this.router.navigate(['/user/user-index'])
              this.loading = true
               },
              error => this._existe = error
            );
  }
  changePassword(){
    this.registerForm.get('password').setValue(null);
    this.registerForm.get('passeConfirmed').setValue(null);
    if(this.changePasse.value){
      this.registerForm.get('password').enable();
      this.registerForm.get('passeConfirmed').enable();

     }else{
      this.registerForm.get('password').disable();
      this.registerForm.get('passeConfirmed').disable();
     }
  }

/**
	 * Checking control validation
	 *
	 * @param controlName: string => Equals to formControlName
	 * @param validationType: string => Equals to valitors name
	 */
	isControlHasError(controlName: string, validationType: string): boolean {
		const control = this.registerForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }

  compare(val1, val2) {
    if(val1 && val2)
    return val1.id === val2.id;

  }
  onChangeDivision(){

    const idDivision = this.registerForm.get('idDivision').value;

    this.registerForm.get('idService').setValue(0)
         this.registerForm.get('idPersonnel').setValue(0)

    if(idDivision != 0){
     this.service1.divisionChange(idDivision)
     .then(data => {
      this.personnels = data[0]
      this.services = data[1]

     })
  }else{
    this.services = null;
    this.personnels = null;
    this.onChangePersonnel()

  }
  }
  onChangeService(){
    const idService = this.registerForm.get('idService').value;
    const idDivision = this.registerForm.get('idDivision').value;
          this.registerForm.get('idPersonnel').setValue(0)

    if(idService != 0){
      this.service1.getRessourceById(idService,'/personnels/service/')
    .then(data =>{ this.personnels = data


       },
      error => console.log(error)
    );





  }else if(idDivision !=0)
    this.onChangeDivision()

  }

  onChangePersonnel(){
    const personnel = this.registerForm.get('idPersonnel').value

    if(personnel !=0){
      this.registerForm.get('roles').enable()
    }else{
      this.registerForm.get('roles').setValue(0)
      this.registerForm.get('roles').disable()

    }

  }

  backList() {
	this.router.navigate(["user/user-index"]);
}

}
