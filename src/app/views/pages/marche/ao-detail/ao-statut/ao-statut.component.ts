import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { AoService } from '../../../shared/ao.service';
import { NotificationService } from '../../../shared/notification.service';
import { SpinnerService } from '../../../utils/spinner.service';
import { ConcelAoComponent } from '../../dialog-forms/concel-ao/concel-ao.component';
import { EditSecteurComponent } from '../../dialog-forms/edit-secteur/edit-secteur.component';

@Component({ 
  selector: 'kt-ao-statut',
  templateUrl: './ao-statut.component.html',
  styleUrls: ['./ao-statut.component.scss']
})
export class AoStatutComponent implements OnInit {
statut:FormGroup
idao:number;
aoDialog = {
  id: 0,
  statutAo: { id: 1, libelle: "" },
  motifAnnulation: "",
};
  constructor(	private activatedRoute: ActivatedRoute,
    private translate: TranslateService,
		private notification: NotificationService,
		public dialog: MatDialog,
    private aoService:AoService) {
    this.statut = new FormGroup({
      id: new FormControl(0,Validators.required),
    });
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
  }

  onSubmit(value:any){
    console.log(value);
    this.aoService.updateStatut(this.idao, value).subscribe(res=>{
      console.log(res)
    },err=>{
      console.log(err)
    })
  
  }
  annulerAO(event): void {
    console.log(event)
		Swal.fire({
			title: "Voulez-vous changer   le statut de cette AO  ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			showCloseButton: true,
			confirmButtonText: "Oui",
			cancelButtonText: "Non",
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
			this.annulerAoDialog(event.value);
			
			}
		});
	}
	// ================================================================
	//
	// ================================================================
	annulerAoDialog(staut:number) {
		const dialogRef = this.dialog.open(ConcelAoComponent, {
			width: "630px",
			data: {
				id: this.idao,
				statutAo: { id:staut  },
				motifAnnulation: "",
			},
		});
		dialogRef.afterClosed().subscribe((res) => {
			if (res) {
				this.aoDialog = res;
				if (res) {
					console.log(
						"Dialog after closed : " +
							JSON.stringify(this.aoDialog, null, 2)
					);
					this.aoService.updateStatutAo(this.aoDialog).subscribe((res) => {

            Swal.fire({
              position: "center",
              icon: "success",
              title: "Statut d'Appel d'offre   a été  changer",
              showConfirmButton: false,
              timer: 500,
            });
						//	this.router.navigate(["/marches/ao-list"]);
						});
				}
			}
		});
	}
	// ===============================================================
	//
	// ===============================================================
	openDialog(): void {
		const dialogRef = this.dialog.open(EditSecteurComponent, {
			width: "800px",
			data: {
				id: "",
				classe: { id: "" },
				secteur: { id: "" },
				ao: { id: this.idao },
				qualifications: [],
			},
		});

}

}
