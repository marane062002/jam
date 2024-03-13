import { Component, OnInit } from '@angular/core';
import { TypeForfaitService } from '../type-forfait.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'kt-add-type-forfait',
  templateUrl: './add-type-forfait.component.html',
  styleUrls: ['./add-type-forfait.component.scss']
})
export class AddTypeForfaitComponent implements OnInit {
  forfait=new FormGroup({
    id: new FormControl(),
    label:new FormControl(),
    prix:new FormControl()
  })
  id
  pageIndex
  pageSize
  constructor(   private service: TypeForfaitService,
    private router: Router,    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      this.id = params['id'];
      this.pageIndex = params['pageIndex'];
      this.pageSize = params['pageSize'];
      if (this.id != undefined && this.id != 0) {
this.service.findById(this.id).subscribe((res)=>{
  this.forfait.patchValue(res)
  
})
      }
    })
  }

  back(): void {
    this.router.navigate(["gsmLan/list-type-forfait"]);
  }
  save(){
    
	  this.service.save(this.forfait.value).subscribe(data =>{
		  console.log(data);
			  this.SuccessDialog();
			 
		  },
		  error => {
			  console.log("error save forfait" + error);
		  }
	  );
  }
  
	SuccessDialog(){
		Swal.fire({
			title: 'Succès',
			text : 'Enregistrement ajouté avec succès',
			icon : 'success',
			showConfirmButton: false,
			timer : 1300
		})
    this.router.navigate(["gsmLan/list-type-forfait"]);
	}

}
