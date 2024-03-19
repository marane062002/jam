import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import Swal from 'sweetalert2';
import { DemandesService } from '../../utils/demandes.service';

@Component({
  selector: 'kt-status-change-dialog',
  templateUrl: './status-change-dialog.component.html',
  styleUrls: ['./status-change-dialog.component.scss']
})
export class StatusChangeDialogComponent implements OnInit {
  selectedFileName:File=null;
  onFileSelected(event){
    this.selectedFileName=<File>event.target.files[0];
    console.log(this.selectedFileName);
  }
  constructor(
    public dialogRef: MatDialogRef<StatusChangeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private demandeService :DemandesService ) {}

  ngOnInit() {
    console.log(this.data);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  uploadFile(id: Number){
    if(!this.selectedFileName){
      return;
    }
    console.log("id", id);
    const formm = new FormData();
    formm.append('file', this.selectedFileName);
    formm.append('type', 'DemandeResponse');
    formm.append('type2', 'license');
    formm.append('id', id.toString());
    this.demandeService.uploadfPubProp(formm).subscribe({
      next: (response) => {
        console.log('File uploaded successfully', response);
      },
      error: (error) => {
        console.error('Error uploading file', error);
      }
    });

  }
  
  changeStatus(newStatus: string): void {
    this.uploadFile(this.data.id);
      
    let data: DialogData = {
      code: this.data.uniqueCode,
      status: newStatus
    }
    console.log(`Status changed to: ${newStatus}`);
    console.log(data);
    this.dialogRef.close(newStatus);
    this.demandeService.changeStatutPubProp(data).subscribe(
      (response) => {
        console.log(response);
        Swal.fire({
          title: 'Success!',
          text: 'تم تغيير الحالة بنجاح',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        .then(() => {
          // window.location.reload();
        })
        
        
        ;
      },
      (error) => {
        console.log(error);
        Swal.fire({
          title: 'Error!',
          text: 'حدث خطأ أثناء تغيير الحالة',
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      }
    );
  }

}


export interface DialogData {
  code: string;
  status: string;
}

