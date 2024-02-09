import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BienscommunalService } from '../../services/bienscommunal.service';
import { Router, ActivatedRoute } from '@angular/router';
import * as $ from "jquery";
import { NotificationService } from '../../../shared/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'kt-toilette-edit',
  templateUrl: './toilette-edit.component.html',
  styleUrls: ['./toilette-edit.component.scss']
})
export class ToiletteEditComponent implements OnInit {
  loading = false;
  toiletteForm: FormGroup;  
  statuts:any;  
  addForm: FormGroup;  
  uploadFiles: Array<File>; 
  type1:string;
  addForm2: FormGroup;  
  uploadFiles2: Array<File>; 
  type2:string;
  id:number
  toilette:any;
 
  constructor(private service:BienscommunalService,
    private router: Router,
    private route:ActivatedRoute,
    private fb:FormBuilder,
    private translate:TranslateService,
    private location:Location

  ) {  
    
    this.route.queryParams.subscribe(params => {
      this.id= params['id'];
    });
    console.log('ID: ' + this.id);

    this.toiletteForm = this.fb.group({
        id: [this.id],
        numToilette: ['', Validators.required],
        localisation:[null],
        dateDebutExploitation:[null],
        dateFinExploitation:[null],
        nomToilette:['', Validators.required],
        nombreToilette:[null],
        superficie:[null],	
        description:[null],	
        observation:[null],	
        dureeExploitation:[null],
    })

    this.addForm = this.fb.group({
      _file: []
    });
    this.addForm2 = this.fb.group({
      _file: []
    });
    
    this.service.getToiletteById(this.id)
    .then(data => {
      console.log(JSON.stringify(data,null,5))
      this.toiletteForm.patchValue(data)     
      this.toiletteForm.get('dateDebutExploitation').patchValue(new Date(data.dateDebutExploitation).toISOString());
      this.toiletteForm.get('dateFinExploitation').patchValue(new Date(data.dateFinExploitation).toISOString());
      //this.domaineForm.get('dateDebutExploitation').patchValue(new Date(data.dateDebutExploitation).toISOString())
        
    })

  //  this.getStatut();
    
  }

  

  ngOnInit() {

      $(function () {
        // We can attach the `fileselect` event to all file inputs on the page
        $(document).on("change", ":file", function () {
          var input = $(this),
            numFiles = input.get(0).files
              ? input.get(0).files.length
              : 1,
            label =  (new String(input.val())).replace(/\\/g, "/").replace(/.*\//, "");
          input.trigger("fileselect", [numFiles, label]);
        });
  
        // We can watch for our custom `fileselect` event like this
        $(document).ready(function () {
          $(":file").on("fileselect", function (event, numFiles, label) {
            var input = $(this).parents(".input-group").find(":text"),
              log = numFiles > 1 ? numFiles + " وثائق مختارة" : label;
  
            if (input.length) {
              input.val(log);
            } else {
              if (log) alert(log);
            }
          });
        });
      });
     
  }
    get f() { return this.toiletteForm?this.toiletteForm.controls:null; }
   
  // getStatut(){
  //   this.service.getStatut()
  //   .then(data =>{this.statuts = data})
  // } 
  
   
  
  onSubmit(){
   
    const formValues = this.toiletteForm.value
    const controls = this.toiletteForm.controls;
    /** check form */
 	if (this.toiletteForm.invalid) {
    
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			return;
		}
    this.loading = true;
      const toilette: any = Object.assign({}, formValues);
     console.log(toilette)
 
   this.service.saveToilette(toilette) 
    .subscribe(data =>{
            let m:any=Object.assign({}, data);
               
              if(this.uploadFiles) 
                    this.service.updloadFilet(this.uploadFiles, m.id,this.type1,'/PjToilettes/multiplefile')
                    .subscribe(resp=>{console.log(resp)},
                    error => console.log(error))
             if(this.uploadFiles2)
              this.service.updloadFilet(this.uploadFiles2, m.id,this.type2,'/PjToilettes/multiplefile')
              .subscribe(resp=>{console.log(resp)},
              error => console.log(error))
              this.router.navigate(['toilette/toilette-index'])
    },error => console.log(error)
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
		const control = this.toiletteForm.controls[controlName];
		if (!control) {
			return false;
		}

		const result = control.hasError(validationType) && (control.dirty || control.touched);
		return result;
  }

   // ============================================
	// Upload file event
	// ============================================
	fileChange1(event,type) {
    this.uploadFiles = event.target.files;
    this.type1 = type
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			
			this.addForm.patchValue(this.uploadFiles);
		
		} 

  }
  fileChange2(event,type) {
    this.uploadFiles2 = event.target.files;
    this.type2 = type
		
		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
		
			this.addForm2.patchValue(this.uploadFiles2);
     
		} 

  }
}
