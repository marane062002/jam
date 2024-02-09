import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../../../core/auth';
import { UidValidator } from './uid-validator';
import { Router } from '@angular/router';
import { MustMatch } from './must-match';
import { OrganisationService } from '../../organisation/organisation.service';
import { PersonnelService } from '../../rh/services/personnel.service';
import { HangarService } from '../../marcheGros/Service/hangar.service';



@Component({
  selector: 'kt-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {


  loading = false;
  roles:any;
  registerForm: FormGroup;
  _existe:any;
  _confirmed:boolean;
  divisions:any;
  services:any;
  personnels:any;

  Hangar:any;
  isMondataire=false
  constructor(private service:AuthService,
    private service1:PersonnelService,
    private service2:OrganisationService,
    private service3:HangarService,
    private uidValidator: UidValidator,
    private router: Router,
    private fb:FormBuilder

  ) {
   this.getAllRoles()
   this.getDivisions()
   this.getHangars()

  }


  creatFormGroup(formBuilder: FormBuilder){
     return formBuilder.group({

          idPersonnel: [0],
          idDivision:[0],
          idService:[0],
          idHangar:[0],
          fullname:['',Validators.required],
          username:[null, [Validators.required/* ,this.uidValidator.validate.bind(this.uidValidator) */]],
          password:[null, [Validators.required/* ,Validators.minLength(4) */]],
          passeConfirmed:[null, [Validators.required]],
          roles:[],
        
        }, {
          validator: MustMatch('password', 'passeConfirmed')})




  }
  getDivisions(){
    this.service2.getRessource('/divisions/index')
    .subscribe(data => this.divisions = data);
  }
  getAllRoles(){
    this.service.getRoleIndex()
    .subscribe(data => this.roles = data[0]);

  }
  getHangars(){
    this.service3.getAllHangars()
    .subscribe((data) =>{
      
      this.Hangar = data.body
    }
  );

  }
  // convenience getter for easy access to form fields


  ngOnInit() {
    this.registerForm = this.creatFormGroup(this.fb);

    if(this.registerForm.get('roles'))
    this.registerForm.get('roles').disable()


  }

  onChangeRoles(e){
    for(let i =0;i<e.length;i++){
      if(e[i].id==34){
this.isMondataire=true
      }else{
        this.isMondataire=false
      }
    }

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


    this.service.register(compte)
    .subscribe(data =>{ console.log(data),
              this.router.navigate(['/user/user-index'])
              this.loading = true
               },
              error => this._existe = error
            );
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

  onChangeDivision(){

    const idDivision = this.registerForm.get('idDivision').value;
    this.registerForm.get('idService').setValue(0)
         this.registerForm.get('idPersonnel').setValue(0)

    if(idDivision != 0){
      this.service1.getRessourceById(idDivision,'/personnels/division/')
    .then(data =>{this.personnels = data


       },
      error => console.log(error)
    );
    this.service2.getRessourceById(idDivision,'/services/divisions/')
    .subscribe(data =>{ this.services =data

       },
      error => console.log(error)
    );

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




}
