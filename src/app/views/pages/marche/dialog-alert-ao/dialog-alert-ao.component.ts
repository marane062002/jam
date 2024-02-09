import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatPaginator, MatSort, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModelAddTypeComponent } from '../../patrimoine-communal/patrimoine/model-add-type/model-add-type.component';
import { AoService } from '../../shared/ao.service';
import { AO } from '../models/ao';

@Component({
  selector: 'kt-dialog-alert-ao',
  templateUrl: './dialog-alert-ao.component.html',
  styleUrls: ['./dialog-alert-ao.component.scss']
})
export class DialogALertAOComponent  {
  dataSource: MatTableDataSource<AO>;
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
  iscommision=false;
  ismaintien=false;
  displayedColumns = [
		"numAo",
		"objet",
		"actions",
	];
  isLoading=true;
  sizeData=0;
  constructor(
    private service:AoService,
    public dialogRef: MatDialogRef<ModelAddTypeComponent>,
    private translate:TranslateService,
    private router:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MAT_DIALOG_DATA) public id: any,
  ) {
    console.log(id)
    this.isLoading = false;
    this.sizeData =10;
    if(data.commision==null){
     console.log(2)
     this.iscommision=false;
     this.ismaintien=true;
     this.dataSource = new MatTableDataSource(data.maintien);
    }else{
      this.dataSource = new MatTableDataSource(data.commision);
        console.log(1)
        this.iscommision=true;
        this.ismaintien=false;
       }
    

    console.log(this.dataSource.data)
   /*  this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
    this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
    this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
    this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
    this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL"); */
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

  showao(idAo) {
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: idAo },
		});
    this.onNoClick();
	}
  deletealert(id){
this.service.deleteAlertCommision(id).subscribe(res=>{
  console.log(res);

},err=>{
  console.log(err)
})
  }
  deletealertMaintein(id){
    console.log("rmainten")
this.service.deletealertMaintien(id).subscribe(res=>{
  console.log(res);
  
},err=>{
  console.log(err)
})
  }
}


