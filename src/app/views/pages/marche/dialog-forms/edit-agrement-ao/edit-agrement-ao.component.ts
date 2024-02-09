import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'kt-edit-agrement-ao',
  templateUrl: './edit-agrement-ao.component.html',
  styleUrls: ['./edit-agrement-ao.component.scss']
})
export class EditAgrementAoComponent implements OnInit {

  agrements=[

 {value:1, name: "lotissement , études de VRD  aménagement"},
 {value:2, name: "Hydraulique urbaine "},
 {value:3, name: "routes, autoroutes transport"},
 {value:4, name: "ouvrage d'art "},
 {value:5, name: " Barrages"},
 {value:6, name: "Travaux Maritimes et fluviaux"},
 {value:7, name: "travaux de génie de défense et caractère "},
 {value:8, name: "Etudes Agricoles"},
 {value:9, name: "industrie et énergie"},
 {value:10, name:  "Géologie Géophysique Géotechnique hydrologie hydrogéologie"},
 {value:11, name:  "Etudes Générales"},
 {value:12, name:  "calcul de structures pour bâtiments tous usages"},
 {value:13, name:  "Courant fort et courant faible pour bâtiment s à tous usages"},
 {value:14, name:   "réseaux des fluides pour bâtiments à tous usages"},
 {value:15, name:  "voirie , reseaux d'assainissement et eau potable"},
 {value:16, name:  "reseaux d'électricité basse et moyenne tension , réseaux téléphonique et éclairage public"},
 {value:17, name: "Etudes d'impact sur l'environnement"},
 {value:18, name: "Géologie Géophysique , hydrologie et hydrogéologie"},
 {value:19, name:  "sécurité contre l'incendie dans les constructions "}
  ]
  // ========================================================================
  //
  // ========================================================================
  constructor(public dialogRef: MatDialogRef<EditAgrementAoComponent>,
    @Inject(MAT_DIALOG_DATA) public formData: any) { }
  // ========================================================================
  //
  // ========================================================================
  ngOnInit() {
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
}
