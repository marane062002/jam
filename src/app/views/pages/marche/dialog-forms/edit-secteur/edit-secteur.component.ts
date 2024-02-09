import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AoService } from '../../../shared/ao.service';

@Component({
  selector: 'kt-edit-secteur',
  templateUrl: './edit-secteur.component.html',
  styleUrls: ['./edit-secteur.component.scss']
})
export class EditSecteurComponent implements OnInit {
  classeList: any;
  secteurList: any;
  qualification: any;
  // ========================================================================
  //
  // ========================================================================
  constructor(
    private service: AoService,
    public dialogRef: MatDialogRef<EditSecteurComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any) { }
  // ========================================================================
  //
  // ========================================================================
  ngOnInit() {
    console.log("Data :: " + JSON.stringify(this.formData, null, 2))
    this.getAllClasses();
    this.getAllSecteurs();
    console.log("secteur :: " + JSON.stringify(this.formData.secteur, null, 2))
    if (this.formData.secteur != null)
      this.service
        .getAllQualificationBySecteur(this.formData.secteur)
        .subscribe(
          (dataQ) => {
            this.qualification = dataQ;
          },
          (error) => console.log(error)
        );
  }
  // ========================================================================
  //
  // ========================================================================
  onNoClick(): void {
    this.dialogRef.close();
  }

  // ========================================================================
  //
  // ========================================================================
  getAllClasses() {
    this.service
      .getAllClasses()
      .subscribe((dataC) => (this.classeList = dataC));
  }
  // ========================================================================
  //
  // ========================================================================
  getAllSecteurs() {
    this.service
      .getAllSecteurs()
      .subscribe((dataS) => (this.secteurList = dataS));
  }
  // ========================================================================
  //
  // ========================================================================
  getSecteurChange(f) {
    const idSect = f.value;
    if (idSect != 0 || idSect != null)
      this.service
        .getAllQualificationBySecteur(idSect)
        .subscribe(
          (dataQ) => {
            this.qualification = dataQ;
          },
          (error) => console.log(error)
        );
  }

}
